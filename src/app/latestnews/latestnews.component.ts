  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { HttpClient } from '@angular/common/http';
  import { CommonModule } from '@angular/common';
  import { EmailService, RawNewsItem } from '../services/api.service';

  interface NewsItem {
    title: string;
    image: string;
    date: string | Date;
    description: string;
  }

  @Component({
    selector: 'app-latestnews',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './latestnews.component.html',
    styleUrl: './latestnews.component.css',
  })
  export class LatestnewsComponent implements OnInit {
    title = '';
    image = '';
    date = '';
    description = '';
    latestNews: NewsItem[] = [];
    currentPage = 1;
    itemsPerPage = 12;
    isFullView = false;

    constructor(private route: ActivatedRoute, private emailService: EmailService) {}
    ngOnInit() {
      this.route.queryParams.subscribe((params) => {
        if (params['title']) {
          this.title = params['title'];
          this.image = params['image'];
          this.date = params['date'];
          this.description = params['description'];
          this.isFullView = true;
        }
      });

      this.emailService.getLatestNews().subscribe({
        next: (data: RawNewsItem[]) => {
          this.latestNews = data
            .map((news) => ({
              title: news.title,
              image: news.news_image,  
              date: this.parseDate(news.date),
              description: news.description,
            }))
            .sort((a, b) => b.date.getTime() - a.date.getTime());
        },
        error: (err) => {
          console.error('Failed to fetch latest news:', err);
        },
      });
    }

parseDate(date: string | Date): Date {
  if (date instanceof Date) return date;

  // Expecting format: YYYY-MM-DD
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
}


    get paginatedNews(): NewsItem[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.latestNews.slice(startIndex, startIndex + this.itemsPerPage);
    }

    nextPage() {
      if (
        this.currentPage < Math.ceil(this.latestNews.length / this.itemsPerPage)
      ) {
        this.currentPage++;
      }
    }

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }

    get totalPages(): number {
      return Math.ceil(this.latestNews.length / this.itemsPerPage);
    }

    viewFullNews(news: NewsItem) {
      this.isFullView = true;
      this.title = news.title;
      this.image = news.image;
      this.date = news.date instanceof Date ? news.date.toISOString() : news.date;
      this.description = news.description;
    }

    backToNewsList() {
      this.isFullView = false;
    }
  }
