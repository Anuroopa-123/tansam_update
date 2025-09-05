import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Card {
  number: string; // Keeping number as a string to store `+`
  text: string;
  icon: string;
  animatedNumber?: string; // Keep this as a string to append "+"
}

@Component({
  selector: 'app-count',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './count.component.html',
  styleUrl: './count.component.css',
})
export class CountComponent implements OnInit {
  staticText = '';
  animatedTexts: string[] = [];
  animatedText = '';
  showCards = false;
  isFinalText = false;
  currentIndex = 0;
  cards: Card[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<any>('assets/Json/count.json').subscribe(data => {
      this.staticText = data.staticText;
      this.animatedTexts = data.animatedTexts;

      // Ensure numbers are properly formatted
      this.cards = data.cards.map((card: any) => ({
        ...card,
        number: card.number, // Keep original `+` symbol in storage
      }));

      this.startTextAnimation();
    });
  }

  startTextAnimation() {
    setInterval(() => {
      this.animatedText = this.animatedTexts[this.currentIndex];
      this.isFinalText = this.currentIndex === this.animatedTexts.length - 1;

      if (this.isFinalText) {
        setTimeout(() => {
          this.showCards = true;
          this.startNumberAnimation();
        }, 1000);
      }

      this.currentIndex = (this.currentIndex + 1) % this.animatedTexts.length;
    }, 3000);
  }

  startNumberAnimation() {
    this.cards.forEach((card: Card, index: number) => {
      let start = 0;
      const target = Number(card.number.replace('+', '')); // Remove `+` for calculation
      const increment = target / 50; // Smooth animation

      const interval = setInterval(() => {
        start += increment;
        card.animatedNumber = Math.floor(start) + '+'; // Append `+` dynamically

        if (start >= target) {
          clearInterval(interval);
          card.animatedNumber = target + '+'; // Ensure final number has `+`
        }
      }, 50);
    });
  }
}
