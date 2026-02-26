import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../models/Country';

@Pipe({
  name: 'filterByContinent',
})
export class FilterByContinentPipe implements PipeTransform {
  transform(countries: Country[], selectedContinent: string): Country[] {
    if (!selectedContinent || selectedContinent === '') {
      // Añade 'All' por si tienes una opción por defecto
      return countries;
    }
    return countries.filter((country: Country) => {
      return country.region === selectedContinent;
    });
  }
}
