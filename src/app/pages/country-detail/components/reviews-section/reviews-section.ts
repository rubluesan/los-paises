import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Country } from '../../../../core/models/Country';
import { Review } from '../../../../core/models/reviews/Review';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../../../core/services/review-service';
import { ToastService } from '../../../../core/services/toast-service';
import { PostReview } from '../../../../core/models/reviews/PostReview';
import { form, FormField, min, required } from '@angular/forms/signals';
import { AuthService } from '../../../../core/services/auth-service';
import { UserInfo } from '../../../../core/models/auth/UserInfo';

@Component({
  selector: 'app-reviews-section',
  imports: [LucideAngularModule, NgOptimizedImage, DatePipe, FormsModule, FormField],
  templateUrl: './reviews-section.html',
  styleUrl: './reviews-section.css',
})
export class ReviewsSection implements OnInit {
  private reviewService = inject(ReviewService);
  private toastService = inject(ToastService);
  private authService = inject(AuthService);

  currentUserInfo = signal<UserInfo | null>(null);

  country = input<Country | null>(null);
  onReviewPosted = output();
  onReviewDeleted = output();
  reviews = signal<Review[]>([]);

  submitting = signal(false);

  reviewFormModel = signal<PostReview>({
    country_id: '',
    rating: 0,
    comment: '',
  });

  reviewForm = form(this.reviewFormModel, (schemaPath) => {
    required(schemaPath.rating, {
      message: 'Debes valorar de 1 a 5 estrellas (Haciendo click sobre ellas).',
    });
    min(schemaPath.rating, 1, {
      message: 'Debes valorar de 1 a 5 estrellas (Haciendo click sobre ellas).',
    });
    required(schemaPath.comment, { message: 'Debes introducir un comentario.' });
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

    if (this.authService.isLoggedIn()) {
      this.authService.getUserInfo().subscribe({
        next: (data) => {
          this.currentUserInfo.set(data);
        },
        error: (error) => {
          this.toastService.showMessage('Ocurrió un error inesperado: ' + error.message, true);
        },
      });
    }
  }

  handleFormSubmit() {
    if (this.reviewForm().invalid()) {
      this.toastService.showMessage(
        'Debe introducir la valoración y el comentario para publicar.',
        true,
      );
      return;
    }
    this.submitReview();
  }

  submitReview() {
    this.reviewForm.country_id().value.set(this.country()?.cca3!);
    const reviewData = this.reviewForm().value();
    this.submitting.set(true);

    this.reviewService.postReview(reviewData).subscribe({
      next: (response) => {
        this.reviews.update((reviews) => {
          return [response.body?.data!, ...reviews];
        });

        // Reset del formulario
        this.reviewFormModel.set({
          country_id: '',
          rating: 0,
          comment: '',
        });

        this.onReviewPosted.emit();
        this.submitting.set(false);
        this.toastService.showMessage('Reseña publicada con éxito', false);
      },
      error: (error) => {
        this.submitting.set(false);
        if (error.status === 401) {
          this.toastService.showMessage('Debes iniciar sesión para poder publicar', true);
        } else {
          this.toastService.showMessage('Ocurrió un error inesperado: ' + error.message, true);
        }
      },
    });
  }

  deleteReview(id: string) {
    this.reviewService.deleteById(id).subscribe({
      next: (response) => {
        this.reviews.update((reviews) => {
          return [...reviews.filter((r) => r.id !== id)];
        });

        this.onReviewDeleted.emit();
        this.toastService.showMessage(response.body?.message!, false);
      },
      error: (error) => {
        this.toastService.showMessage('Ocurrió un error inesperado: ' + error.message, true);
      },
    });
  }
}
