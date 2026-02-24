import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-user-menu',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.css',
})
export class UserMenu {
  isOpen = signal(false);

  // TODO - traer data de usuarios dinamicamente
  user = signal({
    name: 'Rubén Luengo Sánchez',
    email: 'rubololer@gmail.com',
    avatar: 'assets/foto-perfil2.jpg',
  });

  toggleMenu() {
    this.isOpen.update((value) => !value);
  }

  signOut() {
    // Aquí llamarás a supabase.auth.signOut()
    console.log('Cerrando sesión...');
    this.isOpen.set(false);
  }
}
