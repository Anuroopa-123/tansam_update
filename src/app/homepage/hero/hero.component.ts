import { CommonModule } from '@angular/common';
import { NavigationExtras } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import * as AOS from 'aos';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmailService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  state,
} from '@angular/animations';

// interface NewsItem {
//   title: string;
//   image: string;
//   date: string;
//   description: string;
// }

interface NewsItem {
  title: string;
  news_image: string;
  date: Date;
  description: string;
  originalTitle: string;
  published: string;
}

interface RawNewsItem {
  title: string;
  news_image: string;
  date: string;
  description: string;
  published: string;
}
interface SliderItem {
  slider_image: string;
  slider_title: string;
  published: boolean;
  alt?: string;
  title?: string;
  caption?: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  animations: [
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '600ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '600ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('fadeInStagger', [
      transition(':enter', [
        query(
          '.news-card',
          [
            style({ opacity: 0, transform: 'translateX(-40px)' }),
            stagger(
              150,
              animate(
                '400ms ease-out',
                style({ opacity: 1, transform: 'translateX(0)' })
              )
            ),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class HeroComponent implements OnInit {

  news_image: any;

  currentIndex = 0;
  showAllNews = false;

  // @Output() moreNewsClicked = new EventEmitter<void>(); // Emits event to parent

  // constructor(
  //   private emailservice: EmailService,
  //   private router: Router,
  //   private cdr: ChangeDetectorRef
  // ) {}

  // ngOnInit() {
  //   this.fetchLatestNews();
  //   this.fetchSliderImages();
  //   AOS.init();
  //   setInterval(() => this.nextSlide(), 5000);
  // }
  // parseDate(dateStr: string): Date {
  //   const [day, month, year] = dateStr.split('/').map(Number);
  //   return new Date(year, month - 1, day);
  // }

  // fetchLatestNews() {
  //   // console.log('fetch news called');
  //   this.emailservice.getLatestNews().subscribe((data) => {
  //     this.latestNews = data
  //       .filter((news: any) => news.published)
  //       .map((news: any) => ({
  //         originalTitle: news.title,
  //         title: this.limitWords(news.title, 6),
  //         date: new Date(news.date),
  //         description: news.description,
  //         news_image: news.news_image,
  //         published: news.published,
  //       }));
  //     -this.cdr.markForCheck();
  //     AOS.refresh();
  //   });
  // }

  // fetchSliderImages() {
  //   this.emailservice.getSliders().subscribe((data) => {
  //     this.images = data
  //       .filter((slide) => slide.published)
  //       .map((slide) => ({
  //         ...slide,
  //         slider_image: slide.slider_image,
  //         alt: slide.slider_title,
  //         title: slide.slider_title,
  //         caption: '',
  //       }));
  //     this.cdr.markForCheck();
  //     AOS.refresh();
  //   });
  // }

  // limitWords(text: string, wordLimit: number): string {
  //   if (!text) return '';
  //   const words = text.split(' ');
  //   return words.length > wordLimit
  //     ? words.slice(0, wordLimit).join(' ') + '...'
  //     : text;
  // }

  // nextSlide() {
  //   if (this.images.length > 0) {
  //     this.currentIndex = (this.currentIndex + 1) % this.images.length;
  //   }
  // }

  // prevSlide() {
  //   if (this.images.length > 0) {
  //     this.currentIndex =
  //       (this.currentIndex - 1 + this.images.length) % this.images.length;
  //   }
  // }

  // // Show detail view inside this component instead of routing

  // showMoreNews() {
  //   // console.log("More News button clicked!");
  //   this.moreNewsClicked.emit(); // Emit event to parent
  //   this.router.navigate(['latestnews']); // Navigate to latest news without query params
  // }
  // openNewsDetail(news: NewsItem) {
  //   const navigationExtras: NavigationExtras = {
  //     queryParams: {
  //       title: news.originalTitle, // send full original title
  //       image: news.news_image,
  //       date: news.date instanceof Date ? news.date.toISOString() : news.date,
  //       description: news.description,
  //     },
  //   };
  //   this.router.navigate(['latestnews'], navigationExtras);
  // }
  @Output() moreNewsClicked = new EventEmitter<void>();


  images: SliderItem[] = [
    {
      slider_image: 'assets/bannerimage/Slider1.jpg',
      slider_title: 'First Slide',
      published: true,
      alt: 'Slide 1',
      title: 'Honorable Chief Minister, Thiru.M.K.Stalin Inaugurated the TANSAM',
      caption: 'Explore the amazing features we offer.',
    },
    {
      slider_image: 'assets/bannerimage/Slider2.jpg',
      slider_title: 'Second Slide',
      published: true,
      alt: 'Slide 2',
      title: 'Knowledge Sharing by TANSAM Team',
      caption: 'Innovative solutions for modern problems.',
    },
    {
      slider_image: 'assets/bannerimage/Slider3.jpg',
      slider_title: 'Third Slide',
      published: true,
      alt: 'Slide 3',
      title: 'TANSAM',
      caption: 'Be a part of our growing community.',
    },
    {
      slider_image: 'assets/bannerimage/Slider4.jpeg',
      slider_title: 'Fourth Slide',
      published: true,
      alt: 'Slide 4',
      title: 'DPH LAUNCH',
      caption: 'Be a part of our growing community.',
    },
    {
      slider_image: 'assets/bannerimage/Slider5.jpeg',
      slider_title: 'Fifth Slide',
      published: true,
      alt: 'Slide 5',
      title: 'DPH LAUNCH',
      caption: 'Be a part of our growing community.',
    },
    {
      slider_image: 'assets/bannerimage/Army.jpeg',
      slider_title: 'Sixth Slide',
      published: true,
      alt: 'Slide 6',
      title: 'IASC Building Automation Specialist Training Program',
      caption: 'Be a part of our growing community.',
    },
    {
      slider_image: 'assets/bannerimage/visit.jpeg',
      slider_title: 'Seventh Slide',
      published: true,
      alt: 'Slide 7',
      title: 'Sandeep Nanduri(IAS) visited tansam',
      caption: 'Be a part of our growing community.',
    },
    {
      slider_image: 'assets/bannerimage/Raja.jpeg',
      slider_title: 'Eigth Slide',
      published: true,
      alt: 'Slide 8',
      title: 'TRB RAJA MINISTER',
      caption: 'Be a part of our growing community.',
    },
  ];

  latestNews: NewsItem[] = [
    {
      originalTitle: 'Big Event Happening Soon',
      title: 'Big Event Happening Soon',
      date: new Date('2025-09-01'),
      description: 'A major event is planned for the coming month.',
      news_image: 'assets/images/news1.jpg',
      published: 'true',
    },
    {
      originalTitle: 'Community Outreach Success',
      title: 'Community Outreach Success',
      date: new Date('2025-08-25'),
      description: 'Our recent community outreach program was a success.',
      news_image: 'assets/images/news2.jpg',
      published: 'true',
    },
    {
      originalTitle: 'Technology Partnership Announced',
      title: 'Technology Partnership Announced',
      date: new Date('2025-08-20'),
      description: 'We are partnering with tech leaders to innovate.',
      news_image: 'assets/images/news3.jpg',
      published: 'true',
    },
  ];

  ngOnInit() {
    AOS.init();
    setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide() {
    if (this.images.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }

  prevSlide() {
    if (this.images.length > 0) {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  }

  showMoreNews() {
    this.moreNewsClicked.emit();
    // Optionally navigate if routing is kept
    // this.router.navigate(['latestnews']);
  }

  openNewsDetail(news: NewsItem) {
    alert(`News Title: ${news.originalTitle}\nDate: ${news.date.toDateString()}\nDescription: ${news.description}`);
  }
}
