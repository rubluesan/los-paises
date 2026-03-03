import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../core/services/auth-service';
import { UserInfo } from '../../core/models/auth/UserInfo';
import { ToastService } from '../../core/services/toast-service';
import { Router } from '@angular/router';
import { ProfileService } from '../../core/services/profile-service';
import { AvatarUrl, ProfileData, Username } from '../../core/models/ProfileData';
import { form, required, FormField } from '@angular/forms/signals';
import { Meta, Title } from '@angular/platform-browser';
import { ConfirmDeleteModal } from '../../shared/components/confirm-delete-modal/confirm-delete-modal';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, FormsModule, FormField, ConfirmDeleteModal, A11yModule],
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

  user = computed<UserInfo | null>(() => this.authService.userInfo());
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

    // this.refreshUserInfo();
    // this.user.set(this.authService.userInfo());
  }

  updateProfile() {
    if (this.profileInfoForm().invalid()) {
      this.toastService.showMessage('El nombre de usuario es obligatorio', true);
      return;
    }

    const dataToUpdate = this.profileInfoForm().value();
    this.profileService.update(dataToUpdate, this.user()?.profile.id!).subscribe({
      next: (response) => {
        // this.refreshUserInfo();
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
    // this.authService.getUserInfo().subscribe({
    //   next: (data) => {
    //     // this.user.set(data);
    //     // this.authService.userInfo.set(data);
    //   },
    //   error: (error) => {
    //     this.toastService.showMessage('Error inesperado: ' + error.message, true);
    //   },
    // });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    this.profileService.uploadAvatar(formData).subscribe({
      next: (res: any) => {
        const imageUrl: string = res.body.data.url;

        const profileWithNewAvatar = {
          username: this.user()?.profile.username,
          avatar_url: imageUrl,
        } as ProfileData;

        this.profileService
          .saveAvatarUrl(profileWithNewAvatar, this.user()?.profile.id!)
          .subscribe({
            next: (response) => {
              // this.refreshUserInfo();
              this.toastService.showMessage('Imagen cambiada con éxito', false);
            },
            error: (error) => {
              this.toastService.showMessage('Error inesperado: ' + error.message, true);
            },
          });
      },
      error: (error) => {
        this.toastService.showMessage('Error inesperado: ' + error.message, true);
      },
    });
  }
}
