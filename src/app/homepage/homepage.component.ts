import { Component } from '@angular/core';
import { WhoweareComponent } from './whoweare/whoweare.component';
import { HomesolutionComponent } from './homesolution/homesolution.component';
import { PartnersComponent } from "./partners/partners.component";
import { AnnouncementComponent } from "./announcement/announcement.component";
import { NewsletterComponent } from "./newsletter/newsletter.component";
import { MainbannerComponent } from "./mainbanner/mainbanner.component";
import { HeroComponent } from "./hero/hero.component";
import { CountComponent } from "./count/count.component";
import { EntrepreneurIntroComponent } from "../entrepreneur-intro/entrepreneur-intro.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HomesolutionComponent, PartnersComponent, AnnouncementComponent, NewsletterComponent, HeroComponent, CountComponent, EntrepreneurIntroComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
