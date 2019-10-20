import { Component, OnInit } from '@angular/core';
import {faArchive, faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styles: [`
      a {
          text-decoration: none;
      }
  `]
})
export class AdminNavComponent {

  faUsers = faUsers;
}
