import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-fab-button',
  templateUrl: './add-fab-button.component.html',
  styleUrls: ['./add-fab-button.component.scss']
})
export class AddFabButtonComponent {

  add: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  roles: Partial<Roles>;

  faPlus = faPlus;
}
