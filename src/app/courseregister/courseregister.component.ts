import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../services/api.service';

interface Course {
  title: string;
  start_date: string;
  from_time: string;
  time: string;
  imageUrl: string;
  description: string;
  contact_mail: string;
  contact_person: string;
  course_lab: string;
  id?: number;
  mode: string;
}

@Component({
  selector: 'app-courseregister',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courseregister.component.html',
  styleUrl: './courseregister.component.css',
})
export class CourseregisterComponent implements OnInit {
  course: any;
  allCourses: Course[] = [];
  currentUrl: string = '';
  currentPage = 1;
  itemsPerPage = 9;
  showModal = false;
  formData = {
    name: '',
    dob: '',
    mobile: '',
    email: '',
    address: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    collegeName: '',
    department: '',
    year: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private emailService: EmailService
  ) {}

  ngOnInit() {
    const navigation = history.state;

    if (navigation && navigation.allCourses) {
      this.allCourses = navigation.allCourses;
    }

    this.route.paramMap.subscribe((params) => {
      const encodedTitle = params.get('title');
      const decodedTitle = encodedTitle ? encodedTitle.replace(/_/g, ' ') : '';

      // Try to get from navigation first
      if (navigation && navigation.course) {
        this.course = navigation.course;
        this.course.title = this.course.title.replace(/_/g, ' ');
      } else {
        // Fallback: Search in the allCourses list (if present)
        if (this.allCourses?.length) {
          this.course = this.allCourses.find(
            (c) => c.title.toLowerCase() === decodedTitle.toLowerCase()
          );
        }
      }

      console.log('Final resolved course:', this.course);
    });
  }

  viewCourse(course: Course) {
    console.log('Course data:', course);
    const formattedTitle = course.title.replace(/ /g, '_'); // Format title for URL
    this.router.navigate(['courseregister', formattedTitle], {
      state: { course },
    });
  }

  get paginatedCourses() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.allCourses.slice(start, start + this.itemsPerPage);
  }

  totalPages() {
    return Math.ceil(this.allCourses.length / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }

  submitForm(form: any) {
    if (form.valid) {
      const registrationData = {
        name: this.formData.name,
        date_of_birth: this.formData.dob,
        mobile_number: this.formData.mobile,
        email: this.formData.email,
        address_line_1: this.formData.addressLine1,
        address_line_2: this.formData.addressLine2,
        city: this.formData.city,
        state: this.formData.state,
        zip_code: this.formData.zip,
        college_or_organization: this.formData.collegeName,
        department_or_domain: this.formData.department,
        year_or_experience: this.formData.year,
        course: this.course?.id || null,
      };

      this.emailService.registerForCourse(registrationData).subscribe({
        next: (response) => {
          alert('✅ Registration successful!');
          this.closeModal();
          form.resetForm();
        },
        error: (err) => {
          console.error('❌ Registration failed:', err);
          alert('Something went wrong. Please try again.');
        },
      });
    }
  }

  restrictToNumbers(event: KeyboardEvent) {
    const inputChar = event.key;
    if (!/^\d$/.test(inputChar)) {
      event.preventDefault(); // Block non-numeric input
    }
  }
}
