import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive, A11yModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private router: Router = inject(Router);

  isOpen = signal(false);

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen()) {
      this.toggleMenu();
    }
  }

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
