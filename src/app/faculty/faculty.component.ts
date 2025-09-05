import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  headers: string[] = [];
  ongoingData: any[] = [];
  completedData: any[] = [];
  ongoingTotal: any = {};
  completedTotal: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTableData();
  }

  loadTableData() {
    this.http.get<{ headers: string[], data: any[] }>('assets/Json/faculty.json')  // Adjust path if needed
      .subscribe(response => {
        // Exclude "STATUS" and "SL.NO" from headers
        this.headers = response.headers.filter(header => header !== "STATUS" && header !== "SL.NO");

        // Filter ongoing and completed data
        this.ongoingData = response.data.filter(row => row.STATUS === "Ongoing");
        this.completedData = response.data.filter(row => row.STATUS === "Completed");

        // Calculate Totals
        this.ongoingTotal = this.calculateTotal(this.ongoingData);
        this.completedTotal = this.calculateTotal(this.completedData);
      });
  }

  calculateTotal(data: any[]): any {
    let total: any = {};

    // Initialize total row with 0 for numeric columns
    this.headers.forEach(header => {
      if (header === "COURSE" || header === "INSTITUTION TYPE" || header === "YEAR/SEM") {
        total[header] = "";  // Empty string for non-numeric columns
      } else {
        total[header] = 0;  // Initialize numeric columns with 0
      }
    });

    // Sum all numeric values
    data.forEach(row => {
      this.headers.forEach(header => {
        if (typeof row[header] === "number") {
          total[header] += row[header];
        }
      });
    });

    return total;
  }
}
