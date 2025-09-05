import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-entrepreneur-intro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './entrepreneur-intro.component.html',
  styleUrl: './entrepreneur-intro.component.css',
})
export class EntrepreneurIntroComponent {
  
  constructor(private router: Router) {}

showMoreNews() {
    this.router.navigate(['/announcement']);
  }
}
