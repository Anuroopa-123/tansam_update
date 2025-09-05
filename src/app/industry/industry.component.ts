import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-industry',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './industry.component.html',
  styleUrl: './industry.component.css'
})
export class IndustryComponent implements OnInit {
  companies: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ companies: any[] }>('/assets/Json/industry.json').subscribe(data => {
      this.companies = data.companies; // Corrected: Now accessing the companies array correctly
    });
  }
}
