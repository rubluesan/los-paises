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
} from '@angular/forms/signals';
import { AuthService } from '../../core/services/auth-service';
import { RegisterData } from '../../core/models/auth/RegisterData';
import { NotificationToast } from '../../shared/components/notification-toast/notification-toast';

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

  email = '';
  password = '';
  loading = signal(false); // Estado para mostrar el spinner en el botón
  message = signal(''); // Mensaje para el usuario (éxito o error)
  isError = signal(false);

  registerModel = signal<RegisterData>({
    email: '',
    password: '',
    password_confirmation: '',
  });

  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Enter a valid email address' });

    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 8, {
      message: 'The password field must be at least 8 characters',
    });
    maxLength(schemaPath.password, 16, {
      message: 'The password field must have less than 17 characters',
    });
    required(schemaPath.password_confirmation, { message: 'Debes confirmar la contraseña' });
  });

  async handleAuth() {
    this.loading.set(true);
    this.message.set('');

    const data = this.registerForm().value(); // Esto ya te devuelve el objeto RegisterData

    this.authService.register(data).subscribe({
      next: (response) => {
        // response.body?.access_token
        // response.body?.token_type
        // navegamos a la ruta profile/{id}
        this.isError.set(false);
        this.message.set('Registrado con Éxito');
        // this.router.navigateByUrl('/profile:id');
        this.loading.set(false);
      },
      error: (error) => {
        // interpolamos a la vista error.message
        this.isError.set(true);
        this.message.set(error.message);
        this.loading.set(false);
      },
    });

    // this.router.navigate(['/countries']);
  }
}
