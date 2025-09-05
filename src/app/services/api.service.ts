import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

export interface RawNewsItem {
  title: string;
  news_image: string;
  date: string;
  description: string;
  published: string;
}
export interface RawSliderItem {
  slider_image: string;
  slider_title: string;
  published: boolean;
}
export interface RawEntrepreneurshipItem {
  course_image: string;
  course_title: string;
  course_lab: string | null;
  start_date: string;
  from_time: string;
  to_time: string;
  mode: string | null;
  contact_person: string | null;
  contact_mail: string | null;
  published: boolean;
  id?: number;
  created_at?: string;
  updated_at?: string;
}
export interface RawMediaItem {
  id: number;
  name: string;
  title: string;
  media_type: string;
  url: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CourseRegistrationResponse {
  success: boolean;
  message: string;
  registrationId?: number;
}
export interface BaseEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  category: string;
  published: boolean;
}

export interface HackathonEvent extends BaseEvent {
  hackathon_options: string[];
  hackathon_description_style: string;
  hackathon_fontawesome_icons: string;
  font_style?: string;
}

export interface RawWorkshopItem {
  workshop_image: string;
  published: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private baseUrl = 'https://tansam.org';
  private internshipApplyPath = '/api1/internship/apply';
  private contactPath = '/api1/contact';
  private newslettersPath = '/api/newsletters/';
  private sliderpath = '/api/sliders/';
  private entrepreneurshipPath = '/api/entrepreneurships/';
  private workshopimgPath = '/api/workshop_img/';
  private feedbackPath = '/api1/feedback';
  private registerPath = '/api/register-course/';
  private mediaPath = '/api/media-categories/';
  private printmediaPath = '/api/media-items/';
  private careersPath = '/api/careers/';
  private jobApplicationPath = '/api/job-application/';

  private newsBaseUrl = 'https://tansam.org';

  private apiUrl = this.baseUrl + this.internshipApplyPath;
  private contactApiUrl = this.baseUrl + this.contactPath;
  private newsUrl = this.baseUrl + this.newslettersPath;
  private sliderUrl = this.baseUrl + this.sliderpath;
  private entrepreneurshipUrl = this.baseUrl + this.entrepreneurshipPath;
  private workshop_img = this.baseUrl + this.workshopimgPath;
  private registerUrl = this.baseUrl + this.registerPath;
  private mediaUrl = this.baseUrl + this.mediaPath;
  private printmediaUrl = this.baseUrl + this.printmediaPath;
  private jobApplicationUrl = this.baseUrl + this.jobApplicationPath;
  private careersUrl = this.baseUrl + this.careersPath;
  private feedbackApiUrl = this.baseUrl + this.feedbackPath;

  constructor(private http: HttpClient) {}

  sendEmail(formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.apiUrl, formData, { headers }).pipe(
      catchError((error) => {
        console.error('Error sending email:', error);
        return throwError(() => new Error('Email sending failed'));
      })
    );
  }

  sendContactEmail(contactData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.contactApiUrl, contactData, { headers }).pipe(
      catchError((error) => {
        console.error('Error sending contact email:', error);
        return throwError(() => new Error('Contact email sending failed'));
      })
    );
  }
  getMediaCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.mediaUrl).pipe(
      catchError((error) => {
        console.error('Error fetching media categories:', error);
        return throwError(() => new Error('Failed to fetch media categories'));
      })
    );
  }
  getMediaItemsByCategoryId(categoryId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.baseUrl}/api/media-items/${categoryId}/`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching media items by category ID:', error);
          return throwError(() => new Error('Failed to fetch media items'));
        })
      );
  }
  getMediaItemsByCategoryName(categoryName: string): Observable<any[]> {
    const url = `${this.baseUrl}/api/media-items/${categoryName}/`;
    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching media items by category name:', error);
        return throwError(() => new Error('Failed to fetch media items'));
      })
    );
  }
  getEventsByCategory(category: string): Observable<any[]> {
    const url = `${this.baseUrl}/api/events/${category}/`;
    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching events by category:', error);
        return throwError(() => new Error('Failed to fetch events'));
      })
    );
  }
  getCareerJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.careersUrl).pipe(
      catchError((error) => {
        console.error('Error fetching career jobs:', error);
        return throwError(() => new Error('Failed to fetch career jobs'));
      })
    );
  }

  getHackathonEvents(): Observable<HackathonEvent[]> {
    const url = `${this.baseUrl}/api/hackathon-events/`;
    return this.http.get<HackathonEvent[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching Hackathon events:', error);
        return throwError(() => new Error('Failed to fetch Hackathon events'));
      })
    );
  }

  getLatestNews(): Observable<RawNewsItem[]> {
    const url = this.baseUrl + this.newslettersPath;
    return this.http.get<RawNewsItem[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching latest news:', error);
        return throwError(() => new Error('Failed to fetch latest news'));
      })
    );
  }

  registerForCourse(data: any): Observable<CourseRegistrationResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<CourseRegistrationResponse>(this.registerUrl, data, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error during course registration:', error);
          return throwError(() => new Error('Course registration failed'));
        })
      );
  }

  getSliders(): Observable<RawSliderItem[]> {
    const url = this.baseUrl + this.sliderpath;
    return this.http.get<RawSliderItem[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching sliders:', error);
        return throwError(() => new Error('Failed to fetch sliders'));
      })
    );
  }
  getEntrepreneurshipCourses(): Observable<RawEntrepreneurshipItem[]> {
    const url = this.baseUrl + this.entrepreneurshipPath;
    return this.http.get<RawEntrepreneurshipItem[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching entrepreneurship courses:', error);
        return throwError(
          () => new Error('Failed to fetch entrepreneurship courses')
        );
      })
    );
  }

  getWorkshopImages(): Observable<RawWorkshopItem[]> {
    const url = this.baseUrl + this.workshopimgPath;
    return this.http.get<RawWorkshopItem[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching workshop images:', error);
        return throwError(() => new Error('Failed to fetch workshop images'));
      })
    );
  }

  sendFeedbackEmail(feedbackData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(this.feedbackApiUrl, feedbackData, { headers }).pipe(
      catchError((error) => {
        console.error('Error sending feedback email:', error);
        return throwError(() => new Error('Feedback email sending failed'));
      })
    );
  }
  submitJobApplication(formData: FormData): Observable<any> {
    return this.http.post(this.jobApplicationUrl, formData).pipe(
      catchError((error) => {
        console.error('Error submitting job application:', error);
        return throwError(() => new Error('Job application submission failed'));
      })
    );
  }
}
