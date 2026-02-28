import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularComponent, LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../core/services/auth-service';
import { UserInfo } from '../../core/models/auth/UserInfo';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  authService = inject(AuthService);

  user = signal<UserInfo | null>(null);

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user.set(data);
      },
      error: (error) => {
        // errores
      },
    });
  }
}
