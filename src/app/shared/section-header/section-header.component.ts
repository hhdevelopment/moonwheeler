import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-section-header',
  template: `
      <div class="header">
          <h1 class="mat-h1">{{title}}</h1>
      </div>
  `,
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {

  @Input()
  title: string;
}
