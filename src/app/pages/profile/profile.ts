import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../core/services/auth-service';
import { UserInfo } from '../../core/models/auth/UserInfo';
import { ToastService } from '../../core/services/toast-service';
import { Router } from '@angular/router';
import { ProfileService } from '../../core/services/profile-service';
import { Username } from '../../core/models/ProfileData';
import { form, required, FormField } from '@angular/forms/signals';
import { Meta, Title } from '@angular/platform-browser';
import { ConfirmDeleteModal } from '../../shared/components/confirm-delete-modal/confirm-delete-modal';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, FormsModule, FormField, ConfirmDeleteModal],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  profileService = inject(ProfileService);
  authService = inject(AuthService);
  toastService = inject(ToastService);
  private router = inject(Router);

  user = signal<UserInfo | null>(null);
  showModal = signal(false);

  profileInfoModel = signal<Username>({
    username: '',
  });

  profileInfoForm = form(this.profileInfoModel, (schemaPath) => {
    required(schemaPath.username, { message: 'El nombre de usuario es obligatorio' });
  });

  ngOnInit(): void {
    this.titleService.setTitle('Mi Perfil | Los Países');

    this.metaService.updateTag({
      name: 'description',
      content: 'Gestiona tu cuenta e información personal, y mantén tu perfil actualizado.',
    });

    this.metaService.updateTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });

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
        if (error.status === 422) {
          this.toastService.showMessage(
            'El nombre de usuario introducido no está disponible',
            true,
          );
        } else {
          this.toastService.showMessage(error.message, true);
        }
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
