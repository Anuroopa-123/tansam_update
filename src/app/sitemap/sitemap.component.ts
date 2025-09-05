import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sitemap',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sitemap.component.html',
  styleUrl: './sitemap.component.css',
})
export class SitemapComponent implements OnInit {
  expanded: { [key: string]: boolean } = {
    home: false,
    about: false,
    labs: false,
    academic_initiative: false,
    naan_mudhalvan: false,
    media: false,
    brochure: false,
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  toggleSection(section: string): void {
    this.expanded[section] = !this.expanded[section];
  }
}
