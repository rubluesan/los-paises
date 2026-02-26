import { Component, inject, signal, OnInit } from '@angular/core';
import { CountryService } from '../../core/services/country-service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Country } from '../../core/models/Country';
import { NgOptimizedImage } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ReviewsSection } from './components/reviews-section/reviews-section';
@Component({
  selector: 'app-country-detail',
  imports: [NgOptimizedImage, LucideAngularModule, RouterLink, ReviewsSection],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.css',
})
export class CountryDetail implements OnInit {
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
