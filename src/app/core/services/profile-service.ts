import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProfileData } from '../models/ProfileData';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);

  public update(dataToUpdate: any, id: string): Observable<HttpResponse<ProfileData>> {
    return this.http.put<ProfileData>(environment.apiUrl + `/profiles/${id}`, dataToUpdate, {
      observe: 'response',
    });
  }
}
