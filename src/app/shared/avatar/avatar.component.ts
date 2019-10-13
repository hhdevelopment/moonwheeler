import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {SizeProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {

  faUserCircle = faUserCircle;

  @Input()
  photoURL: string;
  @Input()
  @HostBinding('class.size')
  size: SizeProp = '2x';
}
