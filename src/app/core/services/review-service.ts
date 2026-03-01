import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CountryReviews } from '../models/CountryReviews';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private http = inject(HttpClient);

  public getAllByCountry(cca3Code: string): Observable<HttpResponse<CountryReviews>> {
    return this.http.get<CountryReviews>(environment.apiUrl + `/reviews?country_id=${cca3Code}`, {
      observe: 'response',
    });
  }
}
