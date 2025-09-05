import { Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Partner {
  src: string;
  alt: string;
  link: string;
}

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit, AfterViewInit {
  partners: Partner[] = [];

  constructor(private http: HttpClient, private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.http.get<Partner[]>('assets/Json/clients.json').subscribe(
      (data) => {
        this.partners = data;
      },
      (error) => {
        console.error('Error loading partners JSON:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const logoSlider = this.elementRef.nativeElement.querySelector('.logo-slider');
      const logosSlide = this.elementRef.nativeElement.querySelector('.logos-slide');

      if (logoSlider && logosSlide) {
        const copy = logosSlide.cloneNode(true);
        logoSlider.appendChild(copy);
      }
    }, 500);
  }
  openInNewTab(imageSrc: string): void {
    const newTab = window.open();
    
    if (newTab) {
      newTab.location.href = imageSrc;
    } else {
      console.error('Failed to open a new tab');
    }
  }
  
}
