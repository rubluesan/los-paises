import { Component, inject, model, OnInit, signal } from '@angular/core';
import { CountryService } from '../../core/services/country-service';
import { LucideAngularModule } from 'lucide-angular';
import { CountryCard } from './components/country-card/country-card';
import { Country } from '../../core/models/Country';
import { CountryCardSkeleton } from './components/country-card-skeleton/country-card-skeleton';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FilterByNamePipe } from '../../core/pipes/filter-by-name-pipe';
import { FilterByContinentPipe } from '../../core/pipes/filter-by-continent-pipe';
import { FormsModule } from '@angular/forms';
import { CountryStats } from '../../core/models/CountryStats';
import { CountryStatsService } from '../../core/services/country-stats-service';
import { SortAlphabeticallyPipe } from '../../core/pipes/sort-alphabetically-pipe';

@Component({
  selector: 'app-countries',
  imports: [
    LucideAngularModule,
    CountryCard,
    CountryCardSkeleton,
    RouterLink,
    FilterByNamePipe,
    FilterByContinentPipe,
    FormsModule,
    SortAlphabeticallyPipe,
  ],
  templateUrl: './countries.html',
  styleUrl: './countries.css',
})
export class Countries implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  countryService: CountryService = inject(CountryService);

  countries = signal<Country[] | null>(null);
  protected readonly skeletonCount = Array(12).fill(0);

  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  searchedName = signal<string>('');
  selectedContinent = signal<string>('');

  countryStatsService = inject(CountryStatsService);
  allCountryStats = signal<CountryStats[]>([]);

  currentOrder = signal<string>('asc');

  ngOnInit() {
    this.titleService.setTitle('Explorar | Los Países');

    this.metaService.updateTag({
      name: 'description',
      content: 'Explora la lista de países. Elige uno para compartir tu opinión con la comunidad.',
    });

    this.metaService.updateTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });

    this.countryStatsService.getAll().subscribe({
      next: (response) => {
        this.allCountryStats.set(response.body?.data!);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudo cargar las estadísticas');
        this.isLoading.set(false);
      },
    });

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

  getRating(code: string): string {
    const stat = this.allCountryStats().find((s) => s.country_id === code);
    return stat?.total_reviews ? stat.avg_rating.toFixed(1) : 'N/A';
  }

  setOrder(order: 'asc' | 'desc') {
    this.currentOrder.set(order);
  }
}
