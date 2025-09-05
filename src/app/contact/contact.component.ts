import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  isSent = false;
  contactForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private emailService: EmailService,
    private toastr: ToastrService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  sendLetter() {
    if (this.contactForm.valid) {
      this.emailService.sendContactEmail(this.contactForm.value).subscribe({
        next: () => {
          this.isSent = true;
          this.toastr.success('Message sent successfully!', 'Success');
          this.contactForm.reset();

          // Reset animation after a few seconds
          setTimeout(() => {
            this.isSent = false;
          }, 9000);
        },
        error: (err) => {
          console.error('Contact form error:', err);
          this.toastr.error('Failed to send message. Please try again.', 'Error');
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
      this.toastr.error('Please fill all fields correctly.', 'Error');
    }
  }
}
