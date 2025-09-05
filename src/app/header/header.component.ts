import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EmailService, RawMediaItem } from '../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  mediaItems: RawMediaItem[] = [];
  labs: any[] = [];
  isMenuOpen = false;
  isDropdownOpen: { [key: string]: boolean } = {};
  isSubDropdownOpen: { [key: string]: boolean } = {};
  isScrolled = false;

  constructor(private router: Router, private apiService: EmailService) {}

  ngOnInit() {
    this.apiService.getMediaCategories().subscribe({
      next: (data) => {
        this.mediaItems = data;
      },
      error: (err) => {
        console.error('Failed to load media categories', err);
      },
    });
  }

  toggleDropdown(dropdown: string) {
    Object.keys(this.isDropdownOpen).forEach((key) => {
      if (key !== dropdown) {
        this.isDropdownOpen[key] = false;
      }
    });
    this.isDropdownOpen[dropdown] = !this.isDropdownOpen[dropdown];
  }

  toggleSubDropdown(submenu: string) {
    this.isSubDropdownOpen[submenu] = !this.isSubDropdownOpen[submenu];
  }

  navigateToLab(labKey: string) {
    this.closeMenu();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  togglePanelVisibility(): void {
    const overlayPanel = document.getElementById('overlayPanel');
    const dullOverlay = document.getElementById('dullOverlay');
    const rightSideFrame = document.getElementById('rightsideframe');

    if (overlayPanel && dullOverlay && rightSideFrame) {
      const isVisible = overlayPanel.classList.contains('visible');

      if (isVisible) {
        overlayPanel.classList.remove('visible');
        dullOverlay.classList.remove('visible');
        rightSideFrame.classList.remove('open');
      } else {
        overlayPanel.classList.add('visible');
        dullOverlay.classList.add('visible');
        rightSideFrame.classList.add('open');
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const overlayPanel = document.getElementById('overlayPanel');
    const rightSideFrame = document.getElementById('rightsideframe');
    const dullOverlay = document.getElementById('dullOverlay');

    const isClickInsidePanel = overlayPanel?.contains(event.target as Node);
    const isClickOnToggle = rightSideFrame?.contains(event.target as Node);

    if (!isClickInsidePanel && !isClickOnToggle) {
      overlayPanel?.classList.remove('visible');
      dullOverlay?.classList.remove('visible');
      rightSideFrame?.classList.remove('open');
    }

    const isDropdownClick = (event.target as HTMLElement).closest('.dropdown');
    if (!isDropdownClick) {
      Object.keys(this.isDropdownOpen).forEach((key) => {
        this.isDropdownOpen[key] = false;
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 200;
  }
}
