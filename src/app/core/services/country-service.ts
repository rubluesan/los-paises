import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../models/Country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private readonly apiUrl: string = 'https://restcountries.com/v3.1';

  getByCode(code: string): Observable<Country> {
    return this.http.get<Country>(
      `${this.apiUrl}/alpha/${code}?fields=name,cca3,capital,region,population,flags,translations`,
    );
  }

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(
      `${this.apiUrl}/all?fields=name,cca3,capital,region,population,flags,translations`,
    );
  }
}
