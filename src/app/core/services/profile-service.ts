import { HttpBackend, HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AvatarUrl, ProfileData, Username } from '../models/ProfileData';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private externalHttp = inject(HttpClient);
  private handler = inject(HttpBackend);

  constructor() {
    this.externalHttp = new HttpClient(this.handler);
  }

  public update(dataToUpdate: Username, id: string): Observable<HttpResponse<ProfileData>> {
    return this.http.put<ProfileData>(environment.apiUrl + `/profiles/${id}`, dataToUpdate, {
      observe: 'response',
    });
  }

  public uploadAvatar(formData: FormData): Observable<HttpResponse<any>> {
    return this.externalHttp.post(
      `https://api.imgbb.com/1/upload?key=${environment.imgBBapiKey}`,
      formData,
      {
        observe: 'response',
      },
    );
  }

  public saveAvatarUrl(dataToUpdate: AvatarUrl, id: string): Observable<HttpResponse<ProfileData>> {
    return this.http.put<ProfileData>(environment.apiUrl + `/profiles/${id}`, dataToUpdate, {
      observe: 'response',
    });
  }
}
