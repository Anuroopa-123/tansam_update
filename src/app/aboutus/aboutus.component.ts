import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationpathComponent } from "../navigationpath/navigationpath.component";

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {
  tabs: any[] = [];
  selectedTab: string = 'overview';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/Json/aboutus-data.json').subscribe(data => {
      this.tabs = data.tabs;
      this.selectedTab = this.tabs.length > 0 ? this.tabs[0].id : '';
    });
  }

  selectTab(tabId: string): void {
    this.selectedTab = tabId;
  }
}
