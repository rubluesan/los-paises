import { Component, inject, OnInit, signal } from '@angular/core';
import { CountryService } from '../../core/services/country-service';

@Component({
  selector: 'app-countries',
  imports: [],
  templateUrl: './countries.html',
  styleUrl: './countries.css',
})
export class Countries implements OnInit {
  countryService: CountryService = inject(CountryService);
  pais = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.isLoading.set(true);
    this.error.set(null); // <--- MUY IMPORTANTE: Limpiar el error anterior
    this.pais.set(null); // <--- Y limpiar el dato anterior

    this.countryService.getByCode('ESP').subscribe({
      next: (data) => {
        this.pais.set(data.name.common);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('No se pudo encontrar el país');
        this.isLoading.set(false);
      },
    });
  }
}
