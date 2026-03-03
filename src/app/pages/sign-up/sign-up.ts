import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
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
import { ToastService } from '../../core/services/toast-service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  imports: [LucideAngularModule, RouterLink, FormField],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);
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

  ngOnInit(): void {
    this.titleService.setTitle('Registro | Los Países');

    this.metaService.updateTag({
      name: 'description',
      content: 'Crea tu cuenta de Los Países.',
    });

    this.metaService.updateTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

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
