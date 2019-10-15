import {Component} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AngularFireStorage} from '@angular/fire/storage';
import {toolbarAppear} from '../../../shared/animations';
import {LocalStored} from '@hhangular/store';
import {UserService} from '../../../core/service/user/user.service';
import {VehicleTableComponent} from '../../vehicle-table.component';
import {ElectricScooterService} from '../../../core/service/electric-vehicle/electric-scooter.service';
import {EscooterEditDialogComponent} from '../escooter-edit-dialog/escooter-edit-dialog.component';
import {EditDialogComponent} from '../../dialog/edit-dialog.component';

@Component({
  selector: 'app-escooter-table',
  templateUrl: './escooter-table.component.html',
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
export class EscooterTableComponent<T extends ElectricScooter> extends VehicleTableComponent<ElectricScooter> {
  constructor(
    snackBar: MatSnackBar,
    electricScooterService: ElectricScooterService,
    afStorage: AngularFireStorage,
    userService: UserService,
    dialog: MatDialog,
  ) {
    super(snackBar, afStorage, electricScooterService, userService, dialog);
  }

  @LocalStored(4)
  escooterConfig = {
    pageSize: 10,
    sort: {active: null, direction: 'asc'},
    displayedColumns: ['brand-model', 'weight', 'tires-size', 'deck-length', 'range', 'speeds', 'payload', 'max-slope', 'ip-rating', 'actions'],
    visibleColumns: ['brand-model', 'weight', 'tires-size', 'deck-length', 'range', 'speeds', 'payload', 'max-slope', 'ip-rating'],
    columns: ['brand-model', 'weight', 'tires-size', 'deck-length', 'range', 'speeds', 'payload', 'max-slope', 'ip-rating',
      'power-rating', 'operating-temperature', 'battery-capacity', 'charging-time', 'tires-type',
      'tires-pressure', 'front-light', 'rear-light', 'horn', 'turn-signal', 'android', 'ios'],
    pageIndex: 0,
    filter: null
  };

  getConfig() {
    return this.escooterConfig;
  }

  openEditSpecificDialog(item: Partial<ElectricScooter>): MatDialogRef<EditDialogComponent<ElectricScooter>, Partial<ElectricScooter>> {
    return this.dialog.open<EscooterEditDialogComponent, Partial<ElectricScooter>, Partial<ElectricScooter>>(EscooterEditDialogComponent, {width: '90%', data: item});
  }
}
