import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Country } from '../../../../core/models/Country';
import { Review } from '../../../../core/models/Review';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../../../core/services/review-service';
import { ToastService } from '../../../../core/services/toast-service';
import { Profile } from '../../../../core/models/Profile';
import { PostReview } from '../../../../core/models/PostReview';

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
  onReviewPosted = output();
  reviews = signal<Review[]>([]);

  submitting = signal(false);
  userRating = signal(0);
  userComment = signal('');
  userProfile = signal<Profile>({} as Profile);

  userReview = computed<PostReview>(() => {
    return {
      country_id: this.country()?.cca3,
      rating: this.userRating(),
      comment: this.userComment(),
    } as PostReview;
  });

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

  submitReview() {
    this.reviewService.postReview(this.userReview()).subscribe({
      next: (response) => {
        this.reviews.update((reviews) => {
          return [response.body?.data!, ...reviews];
        });
        this.onReviewPosted.emit();
      },
      error: (error) => {
        this.toastService.showMessage('Ocurrió un error inesperado: ' + error.message, true);
      },
    });
  }
}
