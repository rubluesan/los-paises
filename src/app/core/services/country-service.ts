import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private readonly apiUrl: string = 'https://restcountries.com/v3.1';

  countries = signal<Country[]>([]);
  loading = signal(false);

  async getByCode(code: string) {
    this.http.get(`${this.apiUrl}/alpha/${code}?fields=name`).subscribe((data) => {
      console.log(data);
    });
  }
}
