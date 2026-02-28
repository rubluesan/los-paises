import { Component, inject, signal, OnInit } from '@angular/core';
import { CountryService } from '../../core/services/country-service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Country } from '../../core/models/Country';
import { NgOptimizedImage } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ReviewsSection } from './components/reviews-section/reviews-section';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CountryStatsService } from '../../core/services/country-stats-service';
import { CountryStats } from '../../core/models/CountryStats';
@Component({
  selector: 'app-country-detail',
  imports: [NgOptimizedImage, LucideAngularModule, RouterLink, ReviewsSection],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.css',
})
export class CountryDetail implements OnInit {
  private countryService = inject(CountryService);
  private route = inject(ActivatedRoute);
  private countryStatsService = inject(CountryStatsService);

  country = signal<Country | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  countryStats = signal<CountryStats | null>(null);

  mapUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const countryCode = this.route.snapshot.params['code'];

    this.countryStatsService.getById(countryCode).subscribe({
      next: (data) => {
        this.countryStats.set(data.body?.data!);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudieron encontrar estadísticas del país');
        this.isLoading.set(false);
      },
    });

    this.countryService.getByCode(countryCode).subscribe({
      next: (data) => {
        this.country.set(data);

        const countryName = data.name.common;
        const url = `https://maps.google.com/maps?q=${encodeURIComponent(countryName)}&t=&z=5&ie=UTF8&iwloc=&output=embed`;

        this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudo encontrar el país');
        this.isLoading.set(false);
      },
    });
  }

  getInfoItems() {
    const c = this.country();
    if (!c) return [];
    return [
      { icon: 'landmark', label: 'Capital', value: c.capital?.[0] || 'N/A' },
      { icon: 'users', label: 'Población', value: c.population.toLocaleString() },
      { icon: 'map-pin', label: 'Región', value: c.region },
    ];
  }
}
