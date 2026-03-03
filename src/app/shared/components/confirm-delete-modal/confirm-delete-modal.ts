import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm-delete-modal',
  imports: [FormsModule],
  templateUrl: './confirm-delete-modal.html',
  styleUrl: './confirm-delete-modal.css',
})
export class ConfirmDeleteModal {
  targetName = input.required<string>(); // Nombre de la cuenta o repo
  onConfirm = output<void>();
  onCancel = output<void>();

  confirmWord = 'eliminar'; // Puedes cambiar esto por "DELETE"
  userInput = '';
  isConfirmed = signal(false);

  checkInput() {
    this.isConfirmed.set(this.userInput === this.confirmWord);
  }
}
