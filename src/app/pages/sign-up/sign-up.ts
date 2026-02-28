import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import {
  form,
  FormField,
  required,
  email,
  min,
  max,
  minLength,
  maxLength,
  validate,
} from '@angular/forms/signals';
import { AuthService } from '../../core/services/auth-service';
import { RegisterData } from '../../core/models/auth/RegisterData';
import { NotificationToast } from '../../shared/components/notification-toast/notification-toast';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-sign-up',
  imports: [LucideAngularModule, RouterLink, FormField, NotificationToast],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp {
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  email = '';
  password = '';
  loading = signal(false); // Estado para mostrar el spinner en el botón

  registerModel = signal<RegisterData>({
    email: '',
    password: '',
    password_confirmation: '',
  });

  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.email, { message: 'El email es obligatorio' });
    email(schemaPath.email, { message: 'Introduzca un email válido' });

    required(schemaPath.password, { message: 'La contraseña es obligatoria' });
    minLength(schemaPath.password, 8, {
      message: 'La contraseña debe tener al menos 8 carácteres',
    });
    maxLength(schemaPath.password, 16, {
      message: 'La contraseña puede tener 16 carácteres como máximo',
    });
    required(schemaPath.password_confirmation, { message: 'Debes confirmar la contraseña' });

    validate(schemaPath.password_confirmation, ({ value, valueOf }) => {
      const confirm = value();
      const password = valueOf(schemaPath.password);
      if (confirm !== password && confirm.length) {
        return {
          kind: 'passwordMismatch',
          message: 'Las contraseñas no coinciden',
        };
      }
      return null;
    });
  });

  async handleAuth() {
    this.loading.set(true);

    const data = this.registerForm().value();
    if (this.registerForm().invalid()) {
      this.toastService.showMessage(
        'Hay campos inválidos. Por favor, revise el email y contraseña introducidos.',
        true,
      );
      return;
    }

    this.authService.register(data).subscribe({
      next: () => {
        this.toastService.showMessage('Registrado con Éxito', false);
        this.loading.set(false);
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        if (error.status === 422) {
          const backendMessage = error.error.errors?.email?.[0] || 'Este email ya está en uso';
          this.toastService.showMessage(backendMessage, true);
        } else {
          this.toastService.showMessage('Ocurrió un error inesperado: ' + error.error, true);
        }
        this.loading.set(false);
      },
    });
  }
}
