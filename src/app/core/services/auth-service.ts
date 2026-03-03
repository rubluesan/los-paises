import { HttpClient, httpResource, HttpResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterData } from '../models/auth/RegisterData';
import { AuthResponse } from '../models/auth/AuthResponse';
import { UserInfo } from '../models/auth/UserInfo';
import { LoginData } from '../models/auth/LoginData';
import { MessageResponse } from '../models/MessageResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  userSession = signal<string | null>(localStorage.getItem('auth_token'));

  isLoggedIn = computed(() => !!this.userSession());

  userInfo = computed(() => {
    return this.userResource.value() ?? null;
  });

  private userResource = httpResource<UserInfo>(() =>
    this.userSession() ? environment.apiUrl + '/user' : undefined,
  );

  public register(registerData: RegisterData): Observable<HttpResponse<AuthResponse>> {
    return this.http
      .post<AuthResponse>(environment.apiUrl + '/register', registerData, {
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          if (response.body?.access_token) {
            this.saveSession(response.body.access_token);
          }
        }),
      );
  }

  public login(loginData: LoginData): Observable<HttpResponse<AuthResponse>> {
    return this.http
      .post<AuthResponse>(environment.apiUrl + '/login', loginData, {
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          if (response.body?.access_token) {
            this.saveSession(response.body.access_token);
          }
        }),
      );
  }

  public logout(): Observable<MessageResponse> {
    return this.http
      .post<MessageResponse>(environment.apiUrl + '/logout', {
        observe: 'response',
      })
      .pipe(
        tap(() => {
          this.clearSession();
        }),
      );
  }

  public deleteUser(): Observable<MessageResponse> {
    return this.http.delete<MessageResponse>(environment.apiUrl + '/user').pipe(
      tap(() => {
        this.clearSession();
      }),
    );
  }

  private saveSession(access_token: string) {
    localStorage.setItem('auth_token', access_token);
    this.userSession.set(access_token);
  }

  private clearSession() {
    localStorage.removeItem('auth_token');
    this.userSession.set(null);
  }

  refreshUser() {
    this.userResource.reload();
  }
}
