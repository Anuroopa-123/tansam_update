import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Tab {
  id: string;
  title: string;
  content: string;
}
interface WhyChoosePoint {
  heading: string;
  description: string;
}
interface Industry {
  title: string;
  list: string[];
}
interface Connect {
  title: string;
  description: string;
}
interface ContactUs {
  title: string;
  number: string;
  emailJobs: {
    text: string;
    email: string;
  };
  emailTraining: {
    text: string;
    email: string;
  };
}

@Component({
  selector: 'app-gci',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './gci.component.html',
  styleUrls: ['./gci.component.css']
})
export class GciComponent implements OnInit {
  title: string = '';
  description: string = '';
  tabs: Tab[] = [];
  selectedTab: string = '';
  jobList: any[] = [];
  whyChooseTitle: string = '';
  whyChoosePoints: WhyChoosePoint[] = [];
  industries: Industry = { title: '', list: [] };
  connect: Connect = { title: '', description: '' };
    // Initialize contactUs properly
    contactUs: ContactUs = {
      title: '',
      number: '',  // Ensure this field is included
      emailJobs: { text: '', email: '' },
      emailTraining: { text: '', email: '' }
    };
    

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('assets/Json/gci.json').subscribe((data) => {
      this.title = data.title;
      this.description = data.description;
      this.tabs = data.tabs;
      this.jobList = data.jobs;

      // Load "Why Choose Us" section
      this.whyChooseTitle = data.whyChoose.title;
      this.whyChoosePoints = data.whyChoose.points;

      // Load Industries & Let's Connect
      this.industries = data.industries;
      this.connect = data.connect;

      // Load Contact Us Section
      this.contactUs = data.contactUs;

      // Set the first tab as default
      if (this.tabs.length > 0) {
        this.selectedTab = this.tabs[0].id;
      }
    });
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
