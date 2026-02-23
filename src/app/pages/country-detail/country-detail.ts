import { Component, inject, signal } from '@angular/core';
import { CountryService } from '../../core/services/country-service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Country } from '../../core/models/Country';
@Component({
  selector: 'app-country-detail',
  imports: [],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.css',
})
export class CountryDetail {
  private countryService = inject(CountryService);
  private route = inject(ActivatedRoute);

  country = signal<Country | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    const countryCode = this.route.snapshot.params['code'];
    this.countryService.getByCode(countryCode).subscribe({
      next: (data) => {
        this.country.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudo encontrar el país');
        this.isLoading.set(false);
      },
    });
  }
}
