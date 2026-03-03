import { HttpClient, HttpResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
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

  private userDataHandler = signal<UserInfo | null>(null);

  isLoggedIn = computed(() => !!this.userSession());

  userInfo = computed<UserInfo | null>((): UserInfo | null => {
    if (this.isLoggedIn() || this.userSession()) {
      this.getUserInfo().subscribe({
        next: (data) => {
          this.userDataHandler.set(data);
          return data;
        },
        error: (error) => {
          return null;
        },
      });
      return this.userDataHandler();
    } else {
      return null;
    }
  });

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

  private getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(environment.apiUrl + '/user');
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
    // this.userInfo.set(null);
  }
}
