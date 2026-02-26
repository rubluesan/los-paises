import { A11yModule, CdkTrapFocus } from '@angular/cdk/a11y';
import { Component, ElementRef, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-user-menu',
  imports: [LucideAngularModule, RouterLink, A11yModule],
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

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen()) {
      this.toggleMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.toggleMenu();
    }
  }

  toggleMenu() {
    this.isOpen.update((value) => !value);
  }

  signOut() {
    // Aquí llamarás a supabase.auth.signOut()
    console.log('Cerrando sesión...');
    this.isOpen.set(false);
  }
}
