import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EmailService } from '../../services/api.service';

interface Course {
  title: string;
  startDate: string;
  time: string;
  imageUrl: string;
  labs: string;
  mode?: string;
  contact_person?: string;
  contact_mail?: string;
  id?: number;
}

interface Announcement {
  imageUrl: string;
  altText: string;
}

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
})
export class AnnouncementComponent implements OnInit {
  announcements: Announcement[] = [];
  courses: Course[] = [];
  labOptions: string[] = [
    'Innovative Manufacturing',
    'Smart Factory Center',
    'AR | VR | MR Research Centre',
    'Research Centre For PLM',
    'Research Centre For Asset Performance',
    'Product Innovation Center',
    'Predictive Engineering',
  ];

  constructor(private emailService: EmailService, private router: Router) {}

  ngOnInit(): void {
    this.fetchWorkshopImages();
    this.fetchEntrepreneurshipCourses();
  }

  fetchWorkshopImages() {
    this.emailService.getWorkshopImages().subscribe(
      (data) => {
        this.announcements = data
          .filter((item) => item.published)
          .map((item) => ({
            imageUrl: item.workshop_image.startsWith('http')
              ? item.workshop_image
              : 'http://127.0.0.1:8000' + item.workshop_image,
            altText: 'Workshop Image',
          }));
      },
      (error) => {
        console.error('Failed to fetch workshop images:', error);
      }
    );
  }

  fetchEntrepreneurshipCourses() {
    this.emailService.getEntrepreneurshipCourses().subscribe(
      (data) => {
        this.courses = data
          .filter((item) => item.published)
          .map((item) => ({
            title: item.course_title,
            startDate: item.start_date,
            time: `${item.from_time} - ${item.to_time}`,
            imageUrl: item.course_image.startsWith('http')
              ? item.course_image
              : 'http://127.0.0.1:8000' + item.course_image,
            labs: item.course_lab || 'N/A',
            mode: item.mode || 'N/A',
            contact_person: item.contact_person || 'N/A',
            contact_mail: item.contact_mail || 'N/A',
            id: item.id,
          }))
          .sort(
            (a, b) =>
              new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
      },
      (error) => {
        console.error('Failed to fetch entrepreneurship courses:', error);
      }
    );
  }
  handleCourseSelection(course: Course) {
    const formattedTitle = course.title.replace(/ /g, '_'); // Replace spaces with _
    this.router.navigate(['courseregister', formattedTitle], {
      state: { course },
    });
  }

  viewAllCourses() {
    this.router.navigate(['courseregister'], {
      state: { allCourses: this.courses },
    });
  }
}
