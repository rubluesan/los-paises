import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Country } from '../../../../core/models/Country';
import { Review } from '../../../../core/models/Review';
import { CountryStats } from '../../../../core/models/CountryStats';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reviews-section',
  imports: [LucideAngularModule, NgOptimizedImage, DatePipe, FormsModule],
  templateUrl: './reviews-section.html',
  styleUrl: './reviews-section.css',
})
export class ReviewsSection {
  country = input<Country | null>(null);
  stats = signal<CountryStats | null>(null);
  reviews = signal<Review[]>([]);
  loading = signal(true);
  submitting = signal(false);
  showValidationErrors = signal(false);
  isShaking = signal(false);

  userRating = signal(0);
  userComment = signal('');

  handleFormSubmit() {
    if (!this.userRating() || !this.userComment().trim()) {
      this.showValidationErrors.set(true);
      this.isShaking.set(true);
      setTimeout(() => this.isShaking.set(false), 500);
      return;
    }
    this.submitReview();
  }

  submitReview() {}
}
