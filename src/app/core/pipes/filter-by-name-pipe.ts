import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../models/Country';

@Pipe({
  name: 'filterByName',
})
export class FilterByNamePipe implements PipeTransform {
  transform(countries: Country[], filterBy: string): Country[] {
    if (filterBy) {
      return countries.filter((country: Country) => {
        return includesText(country.translations.spa.common, filterBy);
      });
    }
    return countries;
  }
}

function includesText(originalText: string, text: string): boolean {
  const lowercaseOriginal = originalText.toLocaleLowerCase();
  const lowercaseText = text.toLocaleLowerCase();
  return lowercaseOriginal.includes(lowercaseText);
}
