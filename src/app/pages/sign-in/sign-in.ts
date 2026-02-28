import { Component, inject, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { LoginData } from '../../core/models/auth/LoginData';
import { FormField, email, form, maxLength, minLength, required } from '@angular/forms/signals';
import { NotificationToast } from '../../shared/components/notification-toast/notification-toast';

@Component({
  selector: 'app-sign-in',
  imports: [LucideAngularModule, RouterLink, FormField, NotificationToast],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  private router = inject(Router);
  private authService = inject(AuthService);

  email = '';
  password = '';
  loading = signal(false); // Estado para mostrar el spinner en el botón
  message = signal(''); // Mensaje para el usuario (éxito o error)
  isError = signal(false);

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'El email es obligatorio' });
    email(schemaPath.email, { message: 'Introduzca un email válido' });

    required(schemaPath.password, { message: 'La contraseña es obligatoria' });
    // minLength(schemaPath.password, 8, {
    //   message: 'La contraseña debe tener al menos 8 carácteres',
    // });
    // maxLength(schemaPath.password, 16, {
    //   message: 'La contraseña puede tener 16 carácteres como máximo',
    // });
  });

  async handleAuth() {
    this.loading.set(true);
    this.message.set('');

    const data = this.loginForm().value();
    if (this.loginForm().invalid()) {
      this.isError.set(true);
      this.message.set(
        'Hay campos inválidos. Por favor, revise el email y contraseña introducidos.',
      );
      return;
    }

    this.authService.login(data).subscribe({
      next: (response) => {
        this.isError.set(false);
        this.message.set('Iniciada sesión con Éxito');
        this.loading.set(false);

        this.router.navigate(['/profile']);
      },
      error: (error) => {
        this.isError.set(true);
        if (error.status === 422) {
          const backendMessage = error.error.message;
          this.message.set(backendMessage);
        } else {
          this.message.set('Ocurrió un error inesperado: ' + error.error);
        }
        this.loading.set(false);
      },
    });

    // this.router.navigate(['/countries']);
  }
}
