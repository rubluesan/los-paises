import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    this.titleService.setTitle('Los Países | Comunidad Global de Viajeros');
    this.metaService.updateTag({
      name: 'description',
      content:
        'Únete a Los Países, la red social para viajeros. Descubre datos reales de todos los países y comparte tus valoraciones con el mundo.',
    });
  }
}
