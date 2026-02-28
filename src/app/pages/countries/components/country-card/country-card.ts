import { Component, input, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Country } from '../../../../core/models/Country';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-country-card',
  imports: [LucideAngularModule, NgOptimizedImage],
  templateUrl: './country-card.html',
  styleUrl: './country-card.css',
})
export class CountryCard {
  countryData = input<Country | null>(null);
  imgPriority = input<boolean>(false);
  rating = input<string>('N/A');
}
