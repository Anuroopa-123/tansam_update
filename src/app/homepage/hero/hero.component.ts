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
  images: SliderItem[] = [];
  news_image: any;
  latestNews: NewsItem[] = [];
  currentIndex = 0;
  showAllNews = false;

  @Output() moreNewsClicked = new EventEmitter<void>(); // Emits event to parent

  constructor(
    private emailservice: EmailService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchLatestNews();
    this.fetchSliderImages();
    AOS.init();
    setInterval(() => this.nextSlide(), 5000);
  }
  parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  fetchLatestNews() {
    // console.log('fetch news called');
    this.emailservice.getLatestNews().subscribe((data) => {
      this.latestNews = data
        .filter((news: any) => news.published)
        .map((news: any) => ({
          originalTitle: news.title,
          title: this.limitWords(news.title, 6),
          date: new Date(news.date),
          description: news.description,
          news_image: news.news_image,
          published: news.published,
        }));
      -this.cdr.markForCheck();
      AOS.refresh();
    });
  }

  fetchSliderImages() {
    this.emailservice.getSliders().subscribe((data) => {
      this.images = data
        .filter((slide) => slide.published)
        .map((slide) => ({
          ...slide,
          slider_image: slide.slider_image,
          alt: slide.slider_title,
          title: slide.slider_title,
          caption: '',
        }));
      this.cdr.markForCheck();
      AOS.refresh();
    });
  }

  limitWords(text: string, wordLimit: number): string {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(' ') + '...'
      : text;
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

  // Show detail view inside this component instead of routing

  showMoreNews() {
    // console.log("More News button clicked!");
    this.moreNewsClicked.emit(); // Emit event to parent
    this.router.navigate(['latestnews']); // Navigate to latest news without query params
  }
  openNewsDetail(news: NewsItem) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        title: news.originalTitle, // send full original title
        image: news.news_image,
        date: news.date instanceof Date ? news.date.toISOString() : news.date,
        description: news.description,
      },
    };
    this.router.navigate(['latestnews'], navigationExtras);
  }
}
