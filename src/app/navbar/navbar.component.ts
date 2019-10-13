import {Component, OnInit} from '@angular/core';
import {faAngular, faFacebook, faGithub, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {AuthService} from '../core/service/auth/auth.service';
import {faBalanceScale, faCalendarCheck, faCarCrash, faIdBadge, faStore, faUnlock, faUser, faUsersCog} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../core/service/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavBarComponent implements OnInit {

  activeClaims: string[] = [];
  claims: Claims;
  faGoogle = faGoogle;
  faAngular = faAngular;
  faGithub = faGithub;
  faUsersCog = faUsersCog;
  faUser = faUser;
  faStore = faStore;
  faFacebook = faFacebook;
  faUnlock = faUnlock;
  faIdBadge = faIdBadge;
  faBalanceScale = faBalanceScale;
  faCarCrash = faCarCrash;
  faCalendarCheck = faCalendarCheck;


  locales = [
    {path: '/en-us/', label: 'English US', devPort: 4201},
    {path: '/fr-fr/', label: 'Français', devPort: 4200}
  ];

  constructor(
    public auth: AuthService,
    private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getClaims().subscribe((claims: Claims) => {
      this.claims = claims;
      this.activeClaims = Object.keys(claims).filter((key: string) => {
        return claims[key] === true;
      });
    });
  }
}
