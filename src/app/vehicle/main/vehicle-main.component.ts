import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {faArchive, faBars} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicle-main',
  templateUrl: './vehicle-main.component.html',
  styleUrls: ['./vehicle-main.component.scss']
})
export class VehicleMainComponent implements OnInit {

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
