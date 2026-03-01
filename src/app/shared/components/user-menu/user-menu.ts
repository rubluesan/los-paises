import { A11yModule } from '@angular/cdk/a11y';
import { Component, ElementRef, HostListener, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth-service';
import { UserInfo } from '../../../core/models/auth/UserInfo';
import { ToastService } from '../../../core/services/toast-service';

@Component({
  selector: 'app-user-menu',
  imports: [LucideAngularModule, RouterLink, A11yModule],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu implements OnInit {
  private router = inject(Router);
  isOpen = signal(false);
  authService = inject(AuthService);
  toastService = inject(ToastService);

  user = signal<UserInfo | null>(null);

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user.set(data);
        this.authService.userInfo.set(data);
      },
      error: (error) => {
        // errores
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
    this.authService.logout().subscribe({
      next: (response) => {
        localStorage.removeItem('auth_token');
        this.authService.userSession.set(null);
        this.toastService.showMessage(response.message, false);
        this.router.navigate(['/auth/signIn']);
      },
      error: (error) => {
        this.toastService.showMessage(error.message, true);
      },
    });

    this.isOpen.set(false);
  }
}
