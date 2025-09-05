import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { EmailService } from '../services/api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent implements OnInit {
  tabs: any[] = [];
  selectedTab: any = null;
  clickedImageIndex: number | null = null;
  popupImage: string | null = null;
  get remainingHackathonEvents() {
    if (
      !this.selectedTab ||
      !this.selectedTab.events ||
      this.clickedImageIndex === null
    )
      return [];
    return this.selectedTab.events
      .map((event: any, idx: number) => ({ ...event, index: idx }))
      .filter((_: any, idx: number) => idx !== this.clickedImageIndex);
  }

  constructor(
    private dataService: DataService,
    private emailService: EmailService,
    private sanitizer: DomSanitizer
  ) {}

  // ngOnInit() {
  //   this.dataService.getMenuData().subscribe((data) => {
  //     this.tabs = data.tabs;
  //     if (this.tabs.length > 0) {
  //       this.selectTab(this.tabs[0]); // Default first tab active
  //     }
  //   });
  // }
  ngOnInit() {
    this.tabs = [
      { name: 'MoU' },
      { name: 'Officials' },
      { name: 'Industrial Visit' },
      { name: 'Naan Mudhalvan' },
      { name: 'Hackathon' },
    ];
    this.selectTab(this.tabs[0]);
  }
  onPopupImageClick(imageUrl: string) {
    this.popupImage = imageUrl;
  }

  selectTab(tab: any) {
    this.selectedTab = tab;
    this.selectedTab.events = [];

    this.clickedImageIndex = null;

    if (tab.name === 'Hackathon') {
      // Call hackathon-specific API
      this.emailService.getHackathonEvents().subscribe({
        next: (events) => {
          this.selectedTab.events = events.map((event: any) => ({
            ...event,
            description: this.sanitizeHtml(event.description),
          }));
        },
        error: (error) => {
          console.error('Error loading Hackathon events:', error);
        },
      });
    } else {
      // Call normal event API
      this.emailService.getEventsByCategory(tab.name).subscribe({
        next: (events) => {
          this.selectedTab.events = events.map((event: any) => ({
            ...event,
            description: this.sanitizeHtml(event.description),
          }));
        },
        error: (error) => {
          console.error(`Error loading events for ${tab.name}:`, error);
        },
      });
    }
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  onHackathonImageClick(index: number) {
    this.clickedImageIndex = index;
  }
}
