import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../core/services/auth-service';
import { UserInfo } from '../../core/models/auth/UserInfo';
import { ToastService } from '../../core/services/toast-service';
import { Router } from '@angular/router';
import { ProfileService } from '../../core/services/profile-service';
import { Username } from '../../core/models/ProfileData';
import { form, required, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, FormsModule, FormField],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profileService = inject(ProfileService);
  authService = inject(AuthService);
  toastService = inject(ToastService);
  private router = inject(Router);

  user = signal<UserInfo | null>(null);

  profileInfoModel = signal<Username>({
    username: '',
  });

  profileInfoForm = form(this.profileInfoModel, (schemaPath) => {
    required(schemaPath.username, { message: 'El nombre de usuario es obligatorio' });
  });

  ngOnInit(): void {
    this.refreshUserInfo();
  }

  updateProfile() {
    if (this.profileInfoForm().invalid()) {
      this.toastService.showMessage('El nombre de usuario es obligatorio', true);
      return;
    }

    const dataToUpdate = this.profileInfoForm().value();
    this.profileService.update(dataToUpdate, this.user()?.profile.id!).subscribe({
      next: (response) => {
        this.refreshUserInfo();
        this.profileInfoModel.set({
          username: '',
        });
        this.toastService.showMessage('Perfil Actualizado con éxito', false);
      },
      error: (error) => {
        this.toastService.showMessage(error.message, true);
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

  private refreshUserInfo() {
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user.set(data);
      },
      error: (error) => {
        // errores
      },
    });
  }
}
