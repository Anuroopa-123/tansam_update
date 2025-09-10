import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector:'app-deep-drive',
  imports:[CommonModule],
  standalone:true,
  templateUrl:'./deep-drive.html',
  styleUrl:'./deep-drive.css'
})

export class DeepDriveComponent{
  steps = [
    // --- PHASE A ---
    {
      id: 'A1',
      phase: 'A',
      icon: 'search',
      title: 'Specifications & Planning',
      detailTitle: 'Specifications & Planning',
      detailHead: 'Comprehensive Approach to Website and App Development Process',
      details: [
        'What are we building, for what users, and with what features?',
        'What languages, frameworks & services should we use to optimize cost vs functionality?'
      ],
      note: 'Our team of professionals help guide this process through feature suggestions, 80/20 principles, and example specs.',
      sampleLink: { text: 'Sample Specifications Sheet', url: '#' },
      tools: ['Airtable', 'Google Sheets']
    },
    {
      id: 'A2',
      phase: 'A',
      icon: 'design_services',
      title: 'Designs, Wireframe & Prototype',
      detailTitle: 'Designs, Wireframe & Prototype',
      detailHead: '',
      details: [
        'Based on our specifications, we create a beautiful wireframe + prototype.',
        'We then click through it together to make sure it looks and feels the way we want our final product to feel.'
      ],
      note: 'Sample ',
      sampleLink: {
        text: 'Wireframe',
        url1: 'https://www.figma.com/file/tZ0b6FATnEZtrlxsTholyJ/HRMS-Project?type=design&node-id=533-3166&mode=design',
        url2: 'https://www.figma.com/proto/tZ0b6FATnEZtrlxsTholyJ/HRMS-Project?node-id=533-1662&scaling=scale-down&page-id=0%3A1&starting-point-node-id=533%3A3166'
      },
      tools: []
    },
    {
      id: 'A3',
      phase: 'A',
      icon: 'timer',
      title: 'Estimates & Timeline',
      detailTitle: 'Estimates & Timeline',
      details: [
        'Based on specifications and designs, we’ll create a detailed estimate on the project cost + a timeline to deployment',
        'The estimate can then be modified, removing or adding optional features to suit your budget'
      ],
      note: '',
      sampleLink: {},
      tools: ['Airtable', 'Google Sheets']
    },
    // --- PHASE B ---
    {
      id: 'B1',
      phase: 'B',
      icon: 'code',
      title: 'Build',
      detailTitle: 'Build',
      details: [
        'Now we start bringing your project to life with code.',
        'Lean Methodology.',
        'Emphasis on releasing features as soon as possible so that: 1.) You can test it and 2.) Your clients can use it.'
      ],
      note: '',
      sampleLink: {},
      tools: ['Airtable', 'GitLab']
    },
    {
      id: 'B2',
      phase: 'B',
      icon: 'bug_report',
      title: 'Test',
      detailTitle: 'Test',
      details: [
        'Testing for quality and performance across devices, browsers & platforms.'
      ],
      note: '',
      sampleLink: {},
      tools: ['Jest', 'BrowserStack']
    },
    {
      id: 'B3',
      phase: 'B',
      icon: 'cloud_upload',
      title: 'Deploy',
      detailTitle: 'Deploy',
      details: [
        'Deployment to production servers, app stores and URLs.',
        'DevOps to automate these things (trigger test automatically, use Firebase to automatically report bugs and crashes).'
      ],
      note: '',
      sampleLink: {},
      tools: ['GitLab CI', 'Netlify']
    },
    {
      id: 'B4',
      phase: 'B',
      icon: 'assessment',
      title: 'Measure',
      detailTitle: 'Measure',
      details: [
        'Ongoing measurement, analytics, and data-driven refinements.',
        'Letting the client play around with the app and receiving feedback.',
        'Putting out a Beta (if the app is already released) to let a small subsection of the user base play around with the updated app, and receive feedback before rolling it out to the entire userbase.'
      ],
      note: '',
      sampleLink: {},
      tools: ['Google Analytics']
    },
    {
      id: 'B5',
      phase: 'B',
      icon: 'build',
      title: 'Maintain',
      detailTitle: 'Maintain',
      details: [
        'Maintenance, support, and long-term improvement cycles.'
      ],
      note: '',
      sampleLink: {},
      tools: []
    }
  ];

  activeStepIdx = 0;

  selectStep(idx: number) {
    this.activeStepIdx = idx;
  }

  get activeStep() {
    return this.steps[this.activeStepIdx];
  }

  get phaseA() { return this.steps.filter(s => s.phase === 'A'); }
  get phaseB() { return this.steps.filter(s => s.phase === 'B'); }
}