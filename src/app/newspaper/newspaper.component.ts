import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EmailService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newspaper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './newspaper.component.html',
  styleUrl: './newspaper.component.css',
})
export class NewspaperComponent implements OnInit {
  images: string[] = [];
  selectedImage: string | null = null;
  selectedCategoryName = 'Print_Media';

  constructor(
    private emailService: EmailService,
    private route: ActivatedRoute
  ) {}


  // ngOnInit(): void {
  //   this.route.paramMap.subscribe((params) => {
  //     this.selectedCategoryName = params.get('categoryName') || 'Print_Media';
  //     this.loadPrintMediaImages();
  //   });
  // }
ngOnInit(): void {
  this.route.paramMap.subscribe((params) => {
    const categoryId = params.get('id');
    if (categoryId) {
      this.loadMediaItemsByCategoryId(Number(categoryId));
    }
  });
}

loadMediaItemsByCategoryId(categoryId: number): void {
  this.emailService.getMediaItemsByCategoryId(categoryId).subscribe({
    next: (items) => {
      this.images = items.map(item => item.image);
    },
    error: (error) => {
      console.error('Failed to fetch media items', error);
    }
  });
}


  // loadPrintMediaImages(): void {
  //   this.emailService
  //     .getMediaItemsByCategoryName('Print_Media')
  //     .subscribe((items) => {
  //       this.images = items.map((item) => item.image); // image already has full URL
  //     });
  // }

  openModal(image: string) {
    this.selectedImage = image;
  }

  closeModal() {
    this.selectedImage = null;
  }
}
