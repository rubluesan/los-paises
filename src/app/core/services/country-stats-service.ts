import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CountryByIdResponse, CountryStatsResponse } from '../models/CountryStatsResponse';

@Injectable({
  providedIn: 'root',
})
export class CountryStatsService {
  private http = inject(HttpClient);

  public getAll(): Observable<HttpResponse<CountryStatsResponse>> {
    return this.http.get<CountryStatsResponse>(environment.apiUrl + '/countries', {
      observe: 'response',
    });
  }

  public getById(cca3Code: string): Observable<HttpResponse<CountryByIdResponse>> {
    return this.http.get<CountryByIdResponse>(environment.apiUrl + `/countries/${cca3Code}`, {
      observe: 'response',
    });
  }
}
