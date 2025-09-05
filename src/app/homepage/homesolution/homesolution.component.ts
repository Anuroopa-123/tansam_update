import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';

export interface Solution {
  key: string;
  title: string;
  description: string;
  src: string;
}

@Component({
  selector: 'app-homesolution',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homesolution.component.html',
  styleUrls: ['./homesolution.component.css']
})
export class HomesolutionComponent {
  solutions: Solution[] = [];

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Solution[]>('assets/Json/slider-data.json').subscribe(
      (data) => {
        this.solutions = data;
      },
      (error) => {
        console.error('Error loading JSON data:', error);
      }
    );
  }

// Navigate to the corresponding lab page
onTakeOverClick(solutionKey: string): void {
  this.router.navigate([`/labs/${solutionKey}`]); // Navigate to the lab page using the key
}

}
