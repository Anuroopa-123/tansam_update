import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface BannerImage {
  src: string;
  alt: string;
  title: string;
  caption: string;
}

@Component({
  selector: 'app-mainbanner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mainbanner.component.html',
  styleUrls: ['./mainbanner.component.css']
})
export class MainbannerComponent implements OnInit {
  images: BannerImage[] = [];
  currentImageIndex: number = 0;
  isPaused: boolean = false;
  sliderInterval: any;
  isTransitioning: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ images: BannerImage[] }>('assets/Json/bannerimage.json').subscribe(
      data => {
        this.images = data.images;
        this.startSlider();
      },
      error => console.error('Error fetching banner images:', error)
    );
  }

  startSlider(): void {
    if (this.images.length === 0 || this.isPaused) return;
    if (this.sliderInterval) clearInterval(this.sliderInterval);

    this.sliderInterval = setInterval(() => {
      this.nextSlide();
    }, 9000);
  }

  stopSlider(): void {
    if (this.sliderInterval) clearInterval(this.sliderInterval);
  }

  toggleSlider(): void {
    this.isPaused = !this.isPaused;
    this.isPaused ? this.stopSlider() : this.startSlider();
  }

  nextSlide(): void {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Add a slight delay before changing the index
    setTimeout(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.isTransitioning = false;
    }, 1000); // Smooth transition time
  }

  goToSlide(index: number): void {
    if (this.currentImageIndex !== index) {
      this.stopSlider();
      this.currentImageIndex = index;
      this.startSlider();
    }
  }
}
