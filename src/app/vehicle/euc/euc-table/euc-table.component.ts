import {Component} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AngularFireStorage} from '@angular/fire/storage';
import {toolbarAppear} from '../../../shared/animations';
import {LocalStored} from '@hhangular/store';
import {UserService} from '../../../core/service/user/user.service';
import {ElectricUnicycleService} from '../../../core/service/electric-vehicle/electric-unicycle.service';
import {VehicleTableComponent} from '../../vehicle-table.component';
import {EucEditDialogComponent} from '../euc-edit-dialog/euc-edit-dialog.component';
import {EditDialogComponent} from '../../dialog/edit-dialog.component';
import {RatingsUserService} from '../../../core/service/user/ratings-user.service';

@Component({
  selector: 'app-euc-table',
  templateUrl: './euc-table.component.html',
  styleUrls: ['../../vehicle-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    toolbarAppear
  ],
})
export class EucTableComponent extends VehicleTableComponent<ElectricUnicycle> {

  constructor(
    ratingsUserService: RatingsUserService,
    snackBar: MatSnackBar,
    electricUnicycleService: ElectricUnicycleService,
    afStorage: AngularFireStorage,
    userService: UserService,
    dialog: MatDialog,
  ) {
    super(ratingsUserService, snackBar, afStorage, electricUnicycleService, userService, dialog);
  }

  @LocalStored(1)
  eucConfig = {
    pageSize: 10,
    sort: {active: null, direction: 'asc'},
    displayedColumns: ['brand-model', 'weight', 'tire-size', 'range', 'speeds', 'payload', 'max-slope', 'ip-rating', 'actions'],
    visibleColumns: ['brand-model', 'weight', 'tire-size', 'range', 'speeds', 'payload', 'max-slope', 'ip-rating'],
    columns: ['brand-model', 'weight', 'tire-size', 'range', 'speeds', 'payload', 'max-slope', 'ip-rating', 'gap',
      'power-rating', 'operating-temperature', 'battery-capacity', 'charging-time', 'tire-type',
      'tire-pressure', 'front-light', 'rear-light', 'horn', 'turn-signal', 'android', 'ios'],
    pageIndex: 0,
    filter: null
  };

  getConfig() {
    return this.eucConfig;
  }

  openEditSpecificDialog(item: Partial<ElectricUnicycle>): MatDialogRef<EditDialogComponent<ElectricUnicycle>, Partial<ElectricUnicycle>> {
    return this.dialog.open<EucEditDialogComponent, Partial<ElectricUnicycle>, Partial<ElectricUnicycle>>(EucEditDialogComponent, {width: '90%', data: item});
  }
}
