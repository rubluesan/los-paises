import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { ToastService } from './core/services/toast-service';
import { NotificationToast } from './shared/components/notification-toast/notification-toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, NotificationToast],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('los-paises');
  toastService = inject(ToastService);
}
