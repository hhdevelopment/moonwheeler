import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort, SortDirection} from '@angular/material';
import {LocalStored} from '@hhangular/store';
import {faColumns, faGripLines} from '@fortawesome/free-solid-svg-icons';
import {faCheckSquare, faSquare} from '@fortawesome/free-regular-svg-icons';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {SelectionChange, SelectionModel} from '@angular/cdk/collections';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {toolbarAppear} from '../../../shared/animations';
import {UserService} from '../../../core/service/user/user.service';
import {EucEditDialogComponent} from '../euc-dialog/euc-edit-dialog/euc-edit-dialog.component';
import {EucCreateFromJsonDialogComponent} from '../euc-dialog/euc-create-from-json-dialog/euc-create-from-json-dialog.component';
import {ElectricUnicycleService} from '../../../core/service/electric-unicycle/electric-unicycle.service';
import {EucConfirmDeleteDialogComponent} from '../euc-dialog/euc-confirm-delete-dialog/euc-confirm-delete-dialog.component';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';

@Component({
  selector: 'app-euc-table',
  templateUrl: './euc-table.component.html',
  styleUrls: ['./euc-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    toolbarAppear
  ],
})
export class EucTableComponent implements OnInit {

  constructor(
    private afStorage: AngularFireStorage,
    private electricUnicycleService: ElectricUnicycleService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }

  faColumns = faColumns;
  faCheck = faCheckSquare;
  faUncheck = faSquare;
  faGripLines = faGripLines;
  selection: SelectionModel<string>;
  expandedElement: ElectricUnicycle | null;
  overflownElement: ElectricUnicycle | null;
  url: string;

  @LocalStored(1)
  config = {
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

  claims: Partial<Claims>;
  uid: string;
  dataSource = new MatTableDataSource<ElectricUnicycle>();

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  ngOnInit() {
    this.userService.getClaims().subscribe((claims: Claims) => {
      this.claims = claims;
    });
    this.userService.getUid().subscribe((uid: string) => {
      this.uid = uid;
    });
    this.selection = new SelectionModel<string>(true, this.config.visibleColumns);
    this.selection.changed.subscribe((selChange: SelectionChange<string>) => {
      this.config.displayedColumns = selChange.source.selected;
      this.config.visibleColumns = selChange.source.selected;
      this.config.displayedColumns.sort((a: string, b: string) => {
        return this.config.columns.indexOf(a) - this.config.columns.indexOf(b);
      });
      this.config.displayedColumns.push('actions');
    });
    this.electricUnicycleService.list().subscribe(electricUnicycles => this.dataSource.data = electricUnicycles);
//    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sort.active = this.config.sort.active;
    this.dataSource.sort.direction = this.config.sort.direction as SortDirection;
//    this.paginator.pageIndex = this.config.pageIndex;
//    this.paginator.pageSize = this.config.pageSize;
    this.dataSource.filter = this.config.filter;
  }

  sortChange($event: Sort) {
    this.config.sort = $event;
  }


  changePage($event: PageEvent) {
    this.config.pageSize = $event.pageSize;
    this.config.pageIndex = $event.pageIndex;
  }

  applyFilter() {
    this.dataSource.filter = this.config.filter.trim().toLowerCase();
  }

  drop($event: CdkDragDrop<string[]>) {
    moveItemInArray(this.config.columns, $event.previousIndex, $event.currentIndex);
    this.config.displayedColumns.sort((a: string, b: string) => {
      return this.config.columns.indexOf(a) - this.config.columns.indexOf(b);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.config.columns.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.config.columns.forEach(row => this.selection.select(row));
  }

  enterItem($event: ElectricUnicycle) {
    if (this.expandedElement !== $event) {
      this.overflownElement = $event;
    }
  }

  leaveItem() {
    this.overflownElement = undefined;
  }

  clickItem($event: ElectricUnicycle) {
    this.url = null;
    if (this.expandedElement !== $event) {
      if (!!$event.thumbnail) {
        const ref: AngularFireStorageReference = this.afStorage.ref($event.thumbnail);
        ref.getMetadata().subscribe(_ => {
          console.log(_);
        });
        ref.getDownloadURL().subscribe(url => {
          this.url = url;
          this.expandedElement = $event;
        });
      } else {
        this.expandedElement = $event;
      }
    } else {
      this.expandedElement = null;
    }
    if (this.overflownElement === $event) {
      this.overflownElement = undefined;
    } else {
      this.overflownElement = $event;
    }
  }

  actionOnItem(event: { item: Partial<ElectricUnicycle>, action: string }) {
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
