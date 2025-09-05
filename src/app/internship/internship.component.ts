import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../services/api.service'; // Adjust the import path as necessary

@Component({
  selector: 'app-internship',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './internship.component.html',
  styleUrl: './internship.component.css'
})
export class InternshipComponent {
  internshipForm: FormGroup;
  images = ['/assets/headerimage/AI.jpg'];
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private emailService: EmailService
  ) {
    this.internshipForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      collegeName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      duration: ['', Validators.required],
      course: ['', Validators.required],
      referredBy: ['']
    });
  }

  submitForm() {
    if (this.internshipForm.valid) {
      const courseMap: { [key: string]: string } = {
        nxcad: 'NX Cad',
        mendix: 'Mendix',
        simulation: 'Simulation',
        mindsphere: 'IOT with Mindsphere',
        plcpcb: 'PLC & PCB',
        arvr: 'AR/VR',
        dataanalytics: 'Data Analytics using Power BI',
        fullstackdevelopment: 'Full Stack Development',
        aiml: 'AI/ML'
      };

      const formData = { ...this.internshipForm.value };
      formData.course = courseMap[formData.course] || formData.course;

      this.formSubmitted = true;

      this.emailService.sendEmail(formData).subscribe({
        next: () => {
          this.toastr.success('Your internship application has been submitted successfully!', 'Success');
          this.internshipForm.reset();
          this.formSubmitted = false;
        },
        error: (err) => {
          console.error('Email send error:', err);
          this.toastr.error('Failed to submit your application. Please try again.', 'Error');
          this.formSubmitted = false;
        }
      });
    } else {
      this.internshipForm.markAllAsTouched();
      this.toastr.error('Please fill all required fields.', 'Error');
    }
  }
}
