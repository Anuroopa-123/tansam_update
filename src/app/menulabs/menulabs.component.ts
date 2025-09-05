import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as AOS from 'aos';

@Component({
  selector: 'app-menulabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menulabs.component.html',
  styleUrls: ['./menulabs.component.css'],
})
export class MenulabsComponent implements OnInit, OnDestroy {
  labs: any[] = [];
  selectedLab: any = null;
  currentItemIndex: number = 0;
  autoSlideInterval: any;
  selectedLabIndex: number = 0;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.http.get<any[]>('assets/Json/labscontent.json').subscribe((data) => {
      this.labs = data;

      
      const keyFromRoute = this.route.snapshot.paramMap.get('key');

      const foundIndex = this.labs.findIndex(
        (lab) => lab.key === keyFromRoute || lab.title === keyFromRoute
      );

      const indexToSelect = foundIndex !== -1 ? foundIndex : 0;
      this.selectLab(indexToSelect); 

      AOS.init();
    });
  }

  selectLab(index: number): void {
    this.selectedLabIndex = index;
    this.currentItemIndex = index;
    this.selectedLab = this.labs[index];
    this.updateCurrentItem();

    this.startAutoSlide();
  }
 
  startAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }

    this.autoSlideInterval = setInterval(() => {
      this.currentItemIndex = (this.currentItemIndex + 1) % this.labs.length;
      this.selectedLabIndex = this.currentItemIndex;
      this.selectedLab = this.labs[this.currentItemIndex];
      this.updateCurrentItem();
    }, 10000);
  }
nextSlide() {
  this.currentItemIndex = (this.currentItemIndex + 1) % this.labs.length;
  this.selectedLabIndex = this.currentItemIndex; // Add this line
  this.selectedLab = this.labs[this.currentItemIndex];
  this.updateCurrentItem();
}

prevSlide() {
  this.currentItemIndex =
    (this.currentItemIndex - 1 + this.labs.length) % this.labs.length;
  this.selectedLabIndex = this.currentItemIndex; // Add this line
  this.selectedLab = this.labs[this.currentItemIndex];
  this.updateCurrentItem();
}


  updateCurrentItem() {
    if (!this.selectedLab) return;

    this.currentItem = {
      title: this.selectedLab.title,
      description: this.selectedLab.description,
      software: this.selectedLab.software,
      image: this.selectedLab.images?.[0]?.startsWith('/')
        ? this.selectedLab.images[0].slice(1)
        : this.selectedLab.images[0],
    };
    setTimeout(() => {
      AOS.refresh();
    });
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  // Define currentItem as a real variable
  currentItem: any = null;
}
