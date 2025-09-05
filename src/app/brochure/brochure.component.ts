import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brochure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brochure.component.html',
  styleUrls: ['./brochure.component.css'],
})
export class BrochureComponent implements OnInit {
  brochures: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBrochures();
  }

  loadBrochures(): void {
    this.http
      .get<{ brochures: any[] }>('assets/Json/brochure.json') // Fetch JSON file
      .subscribe((response) => {
        this.brochures = response.brochures; // Assign data to component variable
      });
  }

  openPdf(pdfUrl: string): void {
    window.open(pdfUrl, '_blank'); // Open PDF in a new tab
  }
}
