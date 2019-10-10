import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-row-action-button',
  templateUrl: './row-action-button.component.html',
  styleUrls: ['./row-action-button.component.scss']
})
export class RowActionButtonComponent {

  @Input()
  enabled = false;
  @Input()
  icon: IconProp;
  @Output()
  action: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
}
