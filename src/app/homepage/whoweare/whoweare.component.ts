import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whoweare',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './whoweare.component.html',
  styleUrls: ['./whoweare.component.css']
})
export class WhoweareComponent implements OnInit {
  imagesToDisplay: any[] = [];  // Array to hold the first 9 images for the grid display
  fullImages: any[] = [];  // Array to hold all images (more than 9) for the flip animation
  currentIndex: number = 9;  // Start replacing images from the 10th image (index 9)
  latestNews: any[] = [];  // Array to hold the latest news data
  displayedNews: any[] = [];  // Array to store the latest 4 news items displayed

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadImages();  // Load images from the JSON
    this.loadLatestNews();  // Load latest news from the JSON
  }

  loadImages(): void {
    const jsonFiles = [
      'assets/Json/flipimage.json',
      'assets/Json/annoumcement.json',
      'assets/Json/slider-data.json'
      // 'assets/Json/otherimages.json'
    ];

    let imageRequests = jsonFiles.map(file => this.http.get<any[]>(file));

    // Fetch all JSON files and combine images
    Promise.all(imageRequests.map(req => req.toPromise()))
      .then(results => {
        this.fullImages = results.flat(); // Merge all images into one array
        this.imagesToDisplay = this.fullImages.slice(0, 9); // Display first 9 images
        this.startFlippingImages(); // Start flipping animation
      })
      .catch(error => {
        console.error('Error loading image JSON files:', error);
      });
  }


  startFlippingImages(): void {
    setInterval(() => {
      this.flipAndReplaceImages();
    }, 3000);
  }

  flipAndReplaceImages(): void {
    // Flip and replace images sequentially
    for (let i = 0; i < 9; i++) {
      setTimeout(() => {
        this.flipAndReplaceImage(i);
      }, i * 1000);
    }
  }

  flipAndReplaceImage(index: number): void {
    const flippedIndex = this.imagesToDisplay.findIndex(image => image.flipped);

    if (flippedIndex !== -1) {
      // Replace the flipped image with the next image from the fullImages array
      this.imagesToDisplay[flippedIndex] = { ...this.fullImages[this.currentIndex], flipped: false };
      this.currentIndex++;
    } else {
      this.imagesToDisplay[index].flipped = true;
    }

    if (this.currentIndex >= this.fullImages.length) {
      this.currentIndex = 0;
    }
  }

  loadLatestNews(): void {
    // Fetch the news items from latestnews.json
    this.http.get<any[]>('assets/Json/latestnews.json').subscribe(data => {
      this.latestNews = data;  // Store the fetched data in latestNews

      // Assuming each news item has a 'date' field to determine the latest ones
      // Sort the news items by date in descending order
      this.latestNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // Take only the latest 4 news items
      this.displayedNews = this.latestNews.slice(0, 4);
    });
  }

  loadMoreNews(): void {
    // Show all news when "More" is clicked
    this.displayedNews = this.latestNews;
  }
}
