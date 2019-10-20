import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {faBars, faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styles: [``]
})
export class AdminMainComponent implements OnInit {
  faBars = faBars;
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
