import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort, SortDirection} from '@angular/material';
import {LocalStored} from '@hhangular/store';
import {faColumns, faGripLines} from '@fortawesome/free-solid-svg-icons';
import {faCheckSquare, faSquare} from '@fortawesome/free-regular-svg-icons';
import {ElectricVehicleService} from '../../core/electric-vehicle.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {SelectionChange, SelectionModel} from '@angular/cdk/collections';
import {tap} from 'rxjs/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  ],
})
export class EucTableComponent implements OnInit {

  constructor(private electricVehicleService: ElectricVehicleService) {
  }

  faColumns = faColumns;
  faCheck = faCheckSquare;
  faUncheck = faSquare;
  faGripLines = faGripLines;
  selection: SelectionModel<string>;
  expandedElement: ElectricUnicycle | null;
  imageUrl = `${ElectricVehicleService.SQUIDEX_URL}/api/assets/`;
  @LocalStored(23)
  config = {
    pageSize: 5,
    sort: {active: null, direction: 'asc'},
    displayedColumns: ['brand-model', 'weight', 'tire-size', 'range', 'speeds', 'payload', 'max-slope', 'ip-rating'],
    columns: ['brand-model', 'weight', 'tire-size', 'range', 'speeds', 'payload', 'max-slope', 'ip-rating', 'gap',
      'power-rating', 'operating-temperature', 'battery-capacity', 'charging-time', 'tire-type',
      'tire-pressure', 'front-light', 'rear-light', 'horn', 'turn-signal', 'android', 'ios'],
    pageIndex: 0,
    filter: null
  };

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  ngOnInit() {
    this.selection = new SelectionModel<string>(true, this.config.displayedColumns);
    this.selection.changed.subscribe((selChange: SelectionChange<string>) => {
      this.config.displayedColumns = selChange.source.selected;
      this.config.displayedColumns.sort((a: string, b: string) => {
        return this.config.columns.indexOf(a) - this.config.columns.indexOf(b);
      });
    });
    this.electricVehicleService.getUnicycles().pipe(
      tap(_ => console.log(_))

    ).subscribe(unicycles => this.dataSource.data = unicycles);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sort.active = this.config.sort.active;
    this.dataSource.sort.direction = this.config.sort.direction as SortDirection;
    this.paginator.pageIndex = this.config.pageIndex;
    this.paginator.pageSize = this.config.pageSize;
    this.dataSource.filter = this.config.filter;
  }

  sortChange($event: Sort) {
    this.config.sort = $event;
  }


  changePage($event: PageEvent) {
    console.log($event);
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
}
