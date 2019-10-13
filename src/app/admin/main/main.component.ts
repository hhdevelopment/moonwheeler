import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {faBars, faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  faBars = faBars;
  faUsers = faUsers;
  open = true;
  mode: 'over' | 'push' | 'side' = 'side';

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  public ngOnInit(): void {
    this.breakpointObserver.observe('(max-width: 599px)')
      .subscribe(result => {
        this.open = !result.matches;
        this.mode = result.matches ? 'over' : 'side';
      });
  }

}
