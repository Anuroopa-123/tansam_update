import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../../services/api.service';

@Component({
  selector: 'app-jobdetails',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jobdetails.component.html',
  styleUrl: './jobdetails.component.css',
})
export class JobdetailsComponent {
  job: any;
  isSubmitting = false;
  showModal = false;

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  formData = {
    job: '',
    full_name: '',
    contact: '',
    email: '',
    resume: null as File | null,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private emailService: EmailService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.job = navigation?.extras.state?.['job'];

    if (!this.job) {
      this.router.navigate(['/career']);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  goBack() {
    this.router.navigate(['/career']);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.formData.resume = input.files[0];
    }
  }

  submitForm(form: NgForm) {
    if (
      this.formData.full_name &&
      this.formData.contact &&
      /^[0-9]{10}$/.test(this.formData.contact) &&
      this.formData.email &&
      this.formData.resume
    ) {
      this.isSubmitting = true;

      const formDataToSend = new FormData();
      formDataToSend.append('full_name', this.formData.full_name);
      formDataToSend.append('contact', this.formData.contact);
      formDataToSend.append('email', this.formData.email);
      formDataToSend.append('resume', this.formData.resume);
      formDataToSend.append('job', this.job.id.toString());

      this.emailService.submitJobApplication(formDataToSend).subscribe({
        next: () => {
          alert('Application submitted successfully!');
          this.isSubmitting = false;
          this.closeModal();

          // Reset form
          form.resetForm();
          this.formData = {
            job: '',
            full_name: '',
            contact: '',
            email: '',
            resume: null,
          };

          // Clear file input manually
          if (this.fileInputRef) {
            this.fileInputRef.nativeElement.value = '';
          }
        },
        error: (err) => {
          alert('Failed to submit application. Please try again.');
          console.error(err);
          this.isSubmitting = false;
        },
      });
    } else {
      alert('Please complete all required fields with valid data.');
    }
  }
}
