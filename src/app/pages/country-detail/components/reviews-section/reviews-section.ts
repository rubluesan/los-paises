import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Country } from '../../../../core/models/Country';
import { Review } from '../../../../core/models/Review';
import { CountryStats } from '../../../../core/models/CountryStats';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../../../core/services/review-service';
import { ToastService } from '../../../../core/services/toast-service';

@Component({
  selector: 'app-reviews-section',
  imports: [LucideAngularModule, NgOptimizedImage, DatePipe, FormsModule],
  templateUrl: './reviews-section.html',
  styleUrl: './reviews-section.css',
})
export class ReviewsSection implements OnInit {
  private reviewService = inject(ReviewService);
  private toastService = inject(ToastService);
  country = input<Country | null>(null);
  reviews = signal<Review[]>([]);

  submitting = signal(false);
  userRating = signal(0);
  userComment = signal('');

  ngOnInit(): void {
    this.reviewService.getAllByCountry(this.country()!.cca3).subscribe({
      next: (response) => {
        this.reviews.set(response.body?.data!);
      },
      error: (error) => {
        this.toastService.showMessage('Ocurrió un error inesperado: ' + error.message, true);
      },
    });
  }

  handleFormSubmit() {
    if (!this.userRating() || !this.userComment().trim()) {
      return;
    }
    this.submitReview();
  }

  submitReview() {}
}
