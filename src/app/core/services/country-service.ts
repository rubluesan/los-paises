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
      `${this.apiUrl}/alpha/${code}?fields=cca3,capital,region,population,flags,translations,maps,name`,
    );
  }

  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/all?fields=cca3,region,flags,translations`);
  }
}
