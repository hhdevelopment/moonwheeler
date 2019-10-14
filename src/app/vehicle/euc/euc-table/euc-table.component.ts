import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort, SortDirection} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {SelectionChange, SelectionModel} from '@angular/cdk/collections';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {toolbarAppear} from '../../../shared/animations';
import {faCheckSquare, faSquare} from '@fortawesome/free-regular-svg-icons';
import {faColumns, faGripLines, faPencilAlt, faTimes} from '@fortawesome/free-solid-svg-icons';
import {LocalStored} from '@hhangular/store';
import {UserService} from '../../../core/service/user/user.service';
import {EucEditDialogComponent} from '../euc-dialog/euc-edit-dialog/euc-edit-dialog.component';
import {EucCreateFromJsonDialogComponent} from '../euc-dialog/euc-create-from-json-dialog/euc-create-from-json-dialog.component';
import {EucConfirmDeleteDialogComponent} from '../euc-dialog/euc-confirm-delete-dialog/euc-confirm-delete-dialog.component';
import {ElectricUnicycleService} from '../../../core/service/electric-vehicle/electric-unicycle.service';
import {VehicleTableComponent} from '../../vehicle-table.component';

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
    electricUnicycleService: ElectricUnicycleService,
    afStorage: AngularFireStorage,
    userService: UserService,
    dialog: MatDialog,
  ) {
    super(afStorage, electricUnicycleService, userService, dialog);
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

  actionOnItem(event: { item: any, action: string }) {
    if ('edit' === event.action) {
      this.openEditUnicycleDialog(event.item);
    } else if ('delete' === event.action) {
      this.dialog.open<EucConfirmDeleteDialogComponent, ElectricUnicycleConfirmDeleteData>(EucConfirmDeleteDialogComponent, {
        width: '400px',
        data: {item: event.item}
      });
    }
  }

  openEditUnicycleDialog(item: Partial<ElectricUnicycle>, json: boolean = false) {
    if (json) {
      this.dialog.open<EucCreateFromJsonDialogComponent>(EucCreateFromJsonDialogComponent, {
        width: '90%'
      });
    } else {
      this.dialog.open<EucEditDialogComponent, ElectricUnicycleEditData>(EucEditDialogComponent, {
        width: '90%',
        data: {item}
      });
    }
  }
}
