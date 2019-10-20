import { Component, OnInit } from '@angular/core';
import {faArchive} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicle-nav',
  templateUrl: './vehicle-nav.component.html',
  styles: [`
      a {
          text-decoration: none;
      }
  `]
})
export class VehicleNavComponent {

  faArchive = faArchive;
}
