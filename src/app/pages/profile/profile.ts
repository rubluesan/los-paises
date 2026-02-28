import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../core/services/auth-service';
import { UserInfo } from '../../core/models/auth/UserInfo';
import { ToastService } from '../../core/services/toast-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  authService = inject(AuthService);
  toastService = inject(ToastService);
  private router = inject(Router);

  user = signal<UserInfo | null>(null);

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user.set(data);
      },
      error: (error) => {
        // errores
      },
    });
  }

  deleteAccount() {
    this.authService.deleteUser().subscribe({
      next: (response) => {
        this.toastService.showMessage(response.message, false);
        localStorage.removeItem('auth_token');
        this.authService.userSession.set(null);
        this.router.navigate(['/auth/signUp']);
      },
      error: (error) => {
        this.toastService.showMessage(error.message, true);
      },
    });
  }
}
