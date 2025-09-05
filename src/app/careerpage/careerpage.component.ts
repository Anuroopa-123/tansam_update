import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmailService } from '../services/api.service';

@Component({
  selector: 'app-careerpage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './careerpage.component.html',
  styleUrl: './careerpage.component.css',
})
export class CareerpageComponent {
  jobs: any[] = [];
  paginatedJobs: any[] = [];
  currentPage = 1;
  jobsPerPage = 10;

  constructor(private apiService: EmailService, private router: Router) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    // this.http.get<any[]>('/assets/Json/careerpage.json').subscribe((data) => {
    //   this.jobs = data;
    //   this.updatePagination();
    // });
    this.apiService.getCareerJobs().subscribe((data) => {
      this.jobs = data.map((job) => ({
        ...job,
        postedOn: new Date(job.posted_on).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      }));
      this.updatePagination();
    });
  }

  openJobDetails(job: any) {
    this.router.navigate(['/job_details', job.id], { state: { job } });
  }

  get totalPages() {
    return Math.ceil(this.jobs.length / this.jobsPerPage);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxPagesToShow / 2)
    );
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.jobsPerPage;
    this.paginatedJobs = this.jobs.slice(
      startIndex,
      startIndex + this.jobsPerPage
    );
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
  
}
