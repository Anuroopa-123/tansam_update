import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component'; // ✅ adjust path

@Component({
  selector: 'app-ar',
  standalone: true,
  // imports: [CommonModule, HeaderComponent], // ✅ include header
  templateUrl: './AR.component.html',
  styleUrls: ['./AR.component.css']
})
export class ARComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    // Initialization logic
  }
}
