import { Component } from '@angular/core';

@Component({
  selector: 'app-pe',
  templateUrl: './PE.component.html',
  styleUrls: ['./PE.component.css']
})
export class PEComponent {
  title = 'Predictive Engineering';
  description = `
    The Predictive Engineering Lab focuses on advanced simulation, modeling, 
    and analysis techniques to predict product performance before 
    physical prototypes are built. This helps in reducing time, 
    cost, and improving innovation in manufacturing.
  `;
}
