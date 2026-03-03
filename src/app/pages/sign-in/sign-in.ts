import { Component, inject, OnInit, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { LoginData } from '../../core/models/auth/LoginData';
import { FormField, email, form, maxLength, minLength, required } from '@angular/forms/signals';
import { ToastService } from '../../core/services/toast-service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  imports: [LucideAngularModule, RouterLink, FormField],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn implements OnInit {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private router = inject(Router);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  loading = signal(false); // Estado para mostrar el spinner en el botón

  loginModel = signal<LoginData>({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (schemaPath) => {
    required(schemaPath.email, { message: 'El email es obligatorio' });
    email(schemaPath.email, { message: 'Introduzca un email válido' });

    required(schemaPath.password, { message: 'La contraseña es obligatoria' });
  });

  ngOnInit(): void {
    this.titleService.setTitle('Inicio de Sesión | Los Países');

    this.metaService.updateTag({
      name: 'description',
      content: 'Entra en tu cuenta de Los Países.',
    });

    this.metaService.updateTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  async handleAuth() {
    this.loading.set(true);

    const data = this.loginForm().value();
    if (this.loginForm().invalid()) {
      this.toastService.showMessage(
        'Hay campos inválidos. Por favor, revise el email y contraseña introducidos.',
        true,
      );
      return;
    }

    this.authService.login(data).subscribe({
      next: () => {
        this.toastService.showMessage('Iniciada Sesión con éxito.', false);
        this.loading.set(false);

        this.router.navigate(['/profile']);
      },
      error: (error) => {
        if (error.status === 422) {
          const backendMessage = error.error.message;
          this.toastService.showMessage(backendMessage, true);
        } else {
          this.toastService.showMessage('Ocurrió un error inesperado: ' + error.error, true);
        }
        this.loading.set(false);
      },
    });
  }
}
