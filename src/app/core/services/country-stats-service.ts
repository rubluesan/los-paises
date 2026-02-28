import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CountryStats } from '../models/CountryStats';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CountryStatsResponse } from '../models/CountryStatsResponse';

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
}
