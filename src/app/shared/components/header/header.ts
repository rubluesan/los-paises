import { Component, computed, HostListener, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { A11yModule } from '@angular/cdk/a11y';
import { UserMenu } from '../user-menu/user-menu';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule, RouterLink, RouterLinkActive, A11yModule, UserMenu],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private router: Router = inject(Router);
  authService = inject(AuthService);

  userLoggedIn = computed(() => !!this.authService.isLoggedIn());
  mobileNavIsOpen = signal(false);

  // ngOnInit(): void {
  //   this.userLoggedIn.set(this.authService.isLoggedIn());
  // }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.mobileNavIsOpen()) {
      this.toggleMenu();
    }
  }

  toggleMenu() {
    const open = !this.mobileNavIsOpen();
    this.mobileNavIsOpen.set(open);

    // Bloquear scroll de la página cuando el menú está abierto
    document.body.style.overflow = open ? 'hidden' : '';
  }

  login() {
    this.router.navigate(['/auth/signIn']);
  }
}
