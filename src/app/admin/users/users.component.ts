import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {AngularFireFunctions} from '@angular/fire/functions';
import {faFacebook, faGithub, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {toolbarAppear} from '../../shared/animations';
import {faSync, faUser, faUserCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    toolbarAppear
  ]
})
export class UsersComponent implements OnInit {


  faFacebook = faFacebook;
  faGoogle = faGoogle;
  faGithub = faGithub;
  faSync = faSync;
  faUserCircle = faUserCircle;
  expandedElement: any | null;
  showSpinner = false;

  filter = '';

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  dataSource = new MatTableDataSource<any>();

  displayedColumns = ['photoURL', 'email', 'provider', 'uid', 'creationTime', 'lastSignInTime'];

  constructor(
    private afFunctions: AngularFireFunctions) {
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.load();
  }

  applyFilter() {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

  clickItem($event: any) {
    if (this.expandedElement !== $event) {
      this.expandedElement = $event;
    } else {
      this.expandedElement = null;
    }
  }

  load() {
    this.showSpinner = true;
    this.afFunctions.httpsCallable('getAllUsers')({}).subscribe((users) => {
      this.dataSource.data = users;
      this.showSpinner = false;
    });
  }
}
