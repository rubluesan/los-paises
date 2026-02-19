import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private router: Router = inject(Router);

  isOpen = signal(false);

  toggleMenu() {
    const open = !this.isOpen();
    this.isOpen.set(open);

    // Bloquear scroll de la página cuando el menú está abierto
    document.body.style.overflow = open ? 'hidden' : '';
  }

  login() {
    this.router.navigate(['/auth/signIn']);
  }
}
