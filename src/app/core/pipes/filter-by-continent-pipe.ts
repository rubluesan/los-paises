import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../models/Country';

@Pipe({
  name: 'filterByContinent',
})
export class FilterByContinentPipe implements PipeTransform {
  transform(countries: Country[], selectedContinent: string): Country[] {
    if (selectedContinent) {
      return countries.filter((country: Country) => {
        return country.region.localeCompare(selectedContinent);
      });
    }
    return countries;
  }
}
