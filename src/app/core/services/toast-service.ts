import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastMessage = signal<{ text: string; isError: boolean } | null>(null);

  message = signal('');
  isError = signal(false);

  showMessage(msg: string, error = false) {
    this.message.set(msg);
    this.isError.set(error);
    // Opcional: Auto-cerrar tras 3 segundos
    setTimeout(() => this.clear(), 4000);
  }

  clear() {
    this.message.set('');
  }
}
