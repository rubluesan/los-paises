import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Country } from '../models/Country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private readonly apiUrl: string = 'https://restcountries.com/v3.1';

  countries = signal<Country[]>([]);
  loading = signal(false);

  getByCode(code: string): Observable<Country> {
    return this.http.get<Country>(`${this.apiUrl}/alpha/${code}?fields=name`);
  }
}
