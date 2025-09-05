import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../services/api.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {

   constructor(
    private toastr: ToastrService,
    private emailService: EmailService
  ) {}
  feedback = {
    name: '',
    designation: '',
    email: '',
    visitPurpose: '',
    message: '',
    rating: 0
  };

  hoveredRating = 0;
  isRated = false;

  visitPurposes = ['Exploring Programs', 'Attending Workshop', 'Industry Collaboration', 'Student'];
  isOtherPurposeSelected = false;

  emojis = [
    { default: '😡', filled: '😡', tooltip: 'Very Bad' },
    { default: '😟', filled: '😟', tooltip: 'Bad' },
    { default: '😐', filled: '😐', tooltip: 'Neutral' },
    { default: '🙂', filled: '🙂', tooltip: 'Good' },
    { default: '😍', filled: '😍', tooltip: 'Excellent' }
  ];

  setRating(value: number) {
    if (!this.isRated || this.feedback.rating !== value) {
      this.feedback.rating = value;
      this.isRated = true;
    }
  }

  hoverRating(value: number) {
    this.hoveredRating = value;
  }

  resetHover() {
    this.hoveredRating = 0;
  }

  checkOtherOption(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'Other') {
      this.feedback.visitPurpose = '';
      this.isOtherPurposeSelected = true;
    }
  }

  resetToDropdown() {
    this.isOtherPurposeSelected = false;
    this.feedback.visitPurpose = '';
  }

  submitFeedback() {
    if (
      this.feedback.name &&
      this.feedback.designation &&
      this.feedback.email &&
      this.feedback.visitPurpose &&
      this.feedback.message &&
      this.feedback.rating > 0
    ) {
      this.emailService.sendFeedbackEmail(this.feedback).subscribe({
        next: () => {
          this.toastr.success('Thank you for your feedback!', 'Submitted'); // Optional
          this.feedback = {
            name: '',
            designation: '',
            email: '',
            visitPurpose: '',
            message: '',
            rating: 0
          };
          this.isRated = false;
          this.isOtherPurposeSelected = false;
        },
        error: (err) => {
          console.error('Feedback error:', err);
          this.toastr.error('Failed to submit feedback. Please try again.', 'Error'); // Optional
        }
      });
    } else {
      this.toastr.error('Please fill all required fields and give a rating.', 'Error'); // Optional
    }
  }
}
