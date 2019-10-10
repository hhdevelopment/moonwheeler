import {Component} from '@angular/core';
import {faAngular, faGithub, faGoogle, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {AuthService} from '../core/service/auth/auth.service';
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavBarComponent {

  constructor(public auth: AuthService) {
  }

  faGoogle = faGoogle;
  faAngular = faAngular;
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faLock = faLock;
  faUser = faUser;

  locales = [
    {path: '/en-us/', label: 'English US', devPort: 4201},
    {path: '/fr-fr/', label: 'Français', devPort: 4200}
  ];
}
