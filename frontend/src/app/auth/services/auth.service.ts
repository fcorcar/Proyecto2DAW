import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  private http = inject(HttpClient);
  private router = inject(Router);

  checkStatusResource = rxResource({
    loader: () => this.checkStatus(),
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) return 'authenticated';
    return 'not-authenticated';
  });
  user = computed(() => this._user());
  token = computed(() => this._token());

  private _errorMessage = signal<string>('');
  errorMessage = computed(() => this._errorMessage());

  clearError() {
    this._errorMessage.set('');
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error, '/auth/login')),
      );
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}/auth/registro`, {
        name: name,
        email: email,
        password: password,
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error: any) =>
          this.handleAuthError(error, '/auth/registro'),
        ),
      );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.clearSessionData();
      return of(false);
    }

    return this.http
      .get<AuthResponse>(`${baseUrl}/auth/check-status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error, '/auth/login')),
      );
  }

  logout() {
    this.clearSessionData();
    this.router.navigateByUrl('/auth/login');
  }

  checkEmailTaken(email: string): Observable<boolean> {
    return this.http
      .post<{ isTaken: boolean }>(`${baseUrl}/auth/check-email`, {
        email: email
      })
      .pipe(
        map((resp) => resp.isTaken),
        catchError(() => of(false)),
      );
  }

  // Metodos sencundarios
  private handleAuthSuccess({ token, usuario }: AuthResponse) {
    this._user.set(usuario);
    this._authStatus.set('authenticated');
    this._token.set(token);

    localStorage.setItem('token', token);

    return true;
  }

  handleAuthError(error: any, redirectRoute: string) {
    this.clearSessionData();

    const backendMessage = error.error?.error || 'Ocurrió un error inesperado';
    this._errorMessage.set(backendMessage);

    this.router.navigateByUrl(redirectRoute);
    return of(false);
  }

  private clearSessionData() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('token');
  }
}
