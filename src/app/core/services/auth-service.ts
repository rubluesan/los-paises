import { HttpClient, HttpResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterData } from '../models/auth/RegisterData';
import { AuthResponse } from '../models/auth/AuthResponse';
import { UserInfo } from '../models/auth/UserInfo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  userSession = signal<string | null>(localStorage.getItem('auth_token'));

  isLoggedIn = computed(() => !!this.userSession());

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

  public getUserInfo(): Observable<HttpResponse<UserInfo>> {
    return this.http.get<UserInfo>(environment.apiUrl + '/user', {
      observe: 'response',
    });
  }

  private saveSession(access_token: string) {
    localStorage.setItem('auth_token', access_token);
    this.userSession.set(access_token);
  }

  public logout() {
    localStorage.removeItem('auth_token');
    this.userSession.set(null);
  }
}
