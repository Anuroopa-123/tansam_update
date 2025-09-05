import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMenuData(): Observable<any> {
    return this.http.get<any>('/assets/Json/events.json');
  }
}
                                                                                                                                                                              