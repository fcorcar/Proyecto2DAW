import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { UserAdmin } from '../interfaces/user-admin.interface';
import { AdminStats } from '../interfaces/admin-stats.interface';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class AdminService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
  }

  private handleError<T>() {
    return catchError<T, Observable<never>>((error: any) => {
      this.authService.handleAuthError(error, '/auth/login');
      return throwError(() => error);
    });
  }

  getUsers(): Observable<UserAdmin[]> {
    return this.http
      .get<UserAdmin[]>(`${baseUrl}/admin/usuarios`, this.getHeaders())
      .pipe(this.handleError());
  }

  getStats(): Observable<AdminStats> {
    return this.http
      .get<AdminStats>(`${baseUrl}/admin/stats`, this.getHeaders())
      .pipe(this.handleError());
  }

  toggleBlock(userId: number): Observable<any> {
    return this.http
      .patch(
        `${baseUrl}/admin/usuarios/${userId}/toggle-block`,
        {},
        this.getHeaders())
      .pipe(this.handleError());
  }
}
