import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-im',
  templateUrl: './IM.component.html',
  styleUrls: ['./IM.component.css']
})
export class IMComponent implements OnInit {

  isMenuOpen: boolean = false;
  isScrolled: boolean = false;
  isDropdownOpen: any = {};

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      this.isScrolled = window.scrollY > 50;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(key: string) {
    this.isDropdownOpen[key] = !this.isDropdownOpen[key];
  }
}
