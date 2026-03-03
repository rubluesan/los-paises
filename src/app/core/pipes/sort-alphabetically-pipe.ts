import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../models/Country';

@Pipe({
  name: 'sortAlphabetically',
})
export class SortAlphabeticallyPipe implements PipeTransform {
  transform(countries: Country[], sortMode: string): Country[] {
    if (sortMode === 'asc') {
      return countries.sort((a, b) =>
        a.translations.spa.common.localeCompare(b.translations.spa.common),
      );
    } else {
      return countries.sort((a, b) =>
        b.translations.spa.common.localeCompare(a.translations.spa.common),
      );
    }
  }
}
