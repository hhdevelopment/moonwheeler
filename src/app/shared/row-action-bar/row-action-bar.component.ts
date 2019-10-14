import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faPencilAlt, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-row-action-bar',
  templateUrl: './row-action-bar.component.html',
  styleUrls: ['./row-action-bar.component.scss']
})
export class RowActionBarComponent {
  faTimes = faTimes;
  faPencilAlt = faPencilAlt;

  @Input()
  item?: WithContributors;

  @Input()
  claims: Partial<Claims>;
  @Input()
  uid: string;

  @Input()
  actions: { edit: boolean, delete: boolean } = {edit: false, delete: false};

  @Output()
  action: EventEmitter<{ item: WithContributors, action: string }> = new EventEmitter<{ item: WithContributors, action: string }>();

  click($event: MouseEvent, action: string) {
    $event.stopPropagation();
    this.action.emit({item: this.item, action});
  }

  contribuableIsUser(): boolean {
    return this.item && this.item.contributors && this.item.contributors[0].uid === this.uid;
  }

}
