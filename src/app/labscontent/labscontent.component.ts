import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-labscontent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labscontent.component.html',
  styleUrl: './labscontent.component.css',
})
export class LabscontentComponent {
  labs: any[] = [];
  selectedLab: any = null;

  selectedIndex: number = 0; // Current slide index
  interval: any; // For slide change

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadLabs();
  }

  loadLabs(): void {
    this.http.get<any[]>('assets/Json/labscontent.json').subscribe(
      (data) => {
        this.labs = data;
        this.route.paramMap.subscribe((params) => {
          const labKey = params.get('labKey');
          this.selectedLab = this.labs.find((lab) => lab.key === labKey);

          if (this.selectedLab && this.selectedLab.content.length > 0) {
            this.startSlideshow(); // Start the slideshow
          }
        });
      },
      (error) => {
        console.error('Error loading labs JSON:', error);
      }
    );
  }

  startSlideshow(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      if (this.selectedLab) {
        this.selectedIndex =
          (this.selectedIndex + 1) % this.selectedLab.content.length;
      }
    }, 5000); // Change every 15 seconds
  }

  formatText(text: string): string {
    return text.replace(/\n/g, '<br>');
  }
}
