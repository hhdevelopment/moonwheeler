import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent {

  add: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  claims: Partial<Claims>;

  faPlus = faPlus;
}
