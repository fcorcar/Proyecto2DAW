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

  getUsers(): Observable<UserAdmin[]> {
    const token = localStorage.getItem('token');

    return this.http
      .get<UserAdmin[]>(`${baseUrl}/admin/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError((error: any) => {
          this.authService.handleAuthError(error, '/auth/login');
          return throwError(() => error);
        }),
      );
  }

  getStats(): Observable<AdminStats> {
    const token = localStorage.getItem('token');

    return this.http
      .get<AdminStats>(`${baseUrl}/admin/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError((error: any) => {
          this.authService.handleAuthError(error, '/auth/login');
          return throwError(() => error);
        }),
      );
  }

  toggleBlock(userId: number): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http
      .patch(
        `${baseUrl}/admin/usuarios/${userId}/toggle-block`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      .pipe(
        catchError((error) => {
          this.authService.handleAuthError(error, '/auth/login');
          return throwError(() => error);
        }),
      );
  }
}
