import { Component, input, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Country } from '../../../../core/models/Country';

@Component({
  selector: 'app-country-card',
  imports: [LucideAngularModule],
  templateUrl: './country-card.html',
  styleUrl: './country-card.css',
})
export class CountryCard {
  countryData = input<Country | null>(null);
}
