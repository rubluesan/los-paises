import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularComponent, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  username = '';
}
