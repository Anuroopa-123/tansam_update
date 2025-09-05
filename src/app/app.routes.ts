import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
// import { LabscontentComponent } from './labscontent/labscontent.component';
import { MenulabsComponent } from './menulabs/menulabs.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { NaanmudhalvanComponent } from './naanmudhalvan/naanmudhalvan.component';
import { FacultyComponent } from './faculty/faculty.component';
import { BrochureComponent } from './brochure/brochure.component';
import { ContactComponent } from './contact/contact.component';
import { GciComponent } from './gci/gci.component';
import { EventsComponent } from './events/events.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LinkedinComponent } from './linkedin/linkedin.component';
import { NewspaperComponent } from './newspaper/newspaper.component';
import { ProjectComponent } from './project/project.component';
import { IndustryComponent } from './industry/industry.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LatestnewsComponent } from './latestnews/latestnews.component';
import { CourseregisterComponent } from './courseregister/courseregister.component';
import { InternshipComponent } from './internship/internship.component';
import { CareerpageComponent } from './careerpage/careerpage.component';
import { JobdetailsComponent } from './careerpage/jobdetails/jobdetails.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { FrequentquestionComponent } from './frequentquestion/frequentquestion.component';
import { AnnouncementComponent } from './homepage/announcement/announcement.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
 // { path: 'labs/:labKey', component: LabscontentComponent }
  { path: 'labs/:key', component: MenulabsComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'Naan_mudhlvan/up_skilling', component: NaanmudhalvanComponent },
  { path: 'Naan_mudhalvan/faculty_development', component: FacultyComponent },
  { path: 'Brochure', component: BrochureComponent },
  { path: 'contact_us', component: ContactComponent },
  { path: 'GCC', component: GciComponent },
  { path: 'events', component: EventsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'media/:id', component: NewspaperComponent },
  { path: 'TANSAM/LinkedIN', component: LinkedinComponent },
  { path: 'TANSAM_Project', component: ProjectComponent },
  { path: 'industries', component: IndustryComponent },
  { path: 'feedback', component: FeedbackComponent },
  {
    path: 'latestnews',
    component: LatestnewsComponent,
    data: { breadcrumb: 'Latest News' },
  },
  { path: 'courseregister', component: CourseregisterComponent },
  { path: 'courseregister/:title', component: CourseregisterComponent },
  { path: 'internship_Reg', component: InternshipComponent },
  { path: 'career', component: CareerpageComponent },
  { path: 'job_details/:id', component: JobdetailsComponent },
  { path: 'sitemap', component: SitemapComponent },
  { path: 'faq', component: FrequentquestionComponent },
  { path: 'announcement', component: AnnouncementComponent },
];
