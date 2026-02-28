import { A11yModule } from '@angular/cdk/a11y';
import { Component, ElementRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth-service';
import { UserInfo } from '../../../core/models/auth/UserInfo';

@Component({
  selector: 'app-user-menu',
  imports: [LucideAngularModule, RouterLink, A11yModule],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu implements OnInit {
  isOpen = signal(false);
  authService = inject(AuthService);

  // TODO - traer data de usuarios dinamicamente
  user = signal<UserInfo | null>(null);

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (response) => {
        this.user.set(response.body);
      },
      error: (error) => {
        // this.isError.set(true);
        // if (error.status === 422) {
        //   const backendMessage = error.error.errors?.email?.[0] || 'Este email ya está en uso';
        //   this.message.set(backendMessage);
        // } else {
        //   this.message.set('Ocurrió un error inesperado: ' + error.error);
        // }
        // this.loading.set(false);
      },
    });
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen()) {
      this.toggleMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (this.isOpen()) {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.toggleMenu();
      }
    }
  }

  toggleMenu() {
    this.isOpen.update((value) => !value);
  }

  signOut() {
    this.authService.logout();

    this.isOpen.set(false);
  }
}
