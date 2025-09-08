import { Component } from '@angular/core';

@Component({
  selector: 'app-plm',
  templateUrl: './PLM.component.html',
  styleUrls: ['./PLM.component.css']
})
export class PLMComponent {
  title = 'Research Centre for PLM';
  description = `
    The Research Centre for Product Lifecycle Management (PLM) is dedicated 
    to integrating people, processes, business systems, and information 
    across the entire product lifecycle. It aims to provide 
    innovative solutions for design, manufacturing, 
    service, and disposal of products, enabling 
    industries to achieve efficiency, collaboration, 
    and sustainable growth.
  `;
}
