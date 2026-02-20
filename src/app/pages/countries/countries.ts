import { Component, inject, signal } from '@angular/core';
import { CountryService } from '../../core/services/country-service';

@Component({
  selector: 'app-countries',
  imports: [],
  templateUrl: './countries.html',
  styleUrl: './countries.css',
})
export class Countries {
  countryService: CountryService = inject(CountryService);
  pais = signal('');

  ngOnInit() {
    let country = this.countryService.getByCode('ESP');
    this.pais.set(country);
  }
}
