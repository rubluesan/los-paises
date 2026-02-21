import { Component, inject, OnInit, signal } from '@angular/core';
import { CountryService } from '../../core/services/country-service';
import { LucideAngularModule } from 'lucide-angular';
import { CountryCard } from './components/country-card/country-card';
import { Country } from '../../core/models/Country';
import { CountryCardSkeleton } from './components/country-card-skeleton/country-card-skeleton';

@Component({
  selector: 'app-countries',
  imports: [LucideAngularModule, CountryCard, CountryCardSkeleton],
  templateUrl: './countries.html',
  styleUrl: './countries.css',
})
export class Countries implements OnInit {
  countryService: CountryService = inject(CountryService);

  countries = signal<Country[] | null>(null);
  protected readonly skeletonCount = Array(12).fill(0);

  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.countries.set(null);
    this.error.set(null);

    this.countryService.getAll().subscribe({
      next: (data) => {
        this.countries.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudo encontrar el país');
        this.isLoading.set(false);
      },
    });
  }
}
