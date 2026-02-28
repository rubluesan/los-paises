import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterData } from '../models/auth/RegisterData';
import { AuthResponse } from '../models/auth/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  public register(registerData: RegisterData): Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(environment.apiUrl + '/register', registerData, {
      observe: 'response',
    });
  }
}
