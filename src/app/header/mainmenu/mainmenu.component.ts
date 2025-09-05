import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mainmenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit {
  labs: any[] = [];
  isMenuOpen = false;
  isDropdownOpen: { [key: string]: boolean } = {};
  isScrolled = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/Json/labscontent.json').subscribe(
      (data) => {
        this.labs = data;
        // console.log("Labs Data:", this.labs);
      },
      (error) => {
        console.error('Error fetching labs data:', error);
      }
    );
  }


  toggleDropdown(dropdown: string) {
    console.log(`Toggling dropdown: ${dropdown}`);
    Object.keys(this.isDropdownOpen).forEach((key) => {
      if (key !== dropdown) {
        this.isDropdownOpen[key] = false;
      }
    });

    this.isDropdownOpen[dropdown] = !this.isDropdownOpen[dropdown];

    console.log('Dropdown states:', this.isDropdownOpen);
  }


  navigateToLab(labKey: string) {
    this.router.navigate(['/labs', labKey]);
    this.closeMenu(); // Close menu after navigating
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 150;
  }
}
