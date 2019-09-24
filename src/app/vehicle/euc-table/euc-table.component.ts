import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort, SortDirection} from '@angular/material';
import {LocalStored} from '@hhangular/store';
import {faColumns} from '@fortawesome/free-solid-svg-icons';
import {faCheckSquare, faSquare} from '@fortawesome/free-regular-svg-icons';
import {ElectricVehicleService} from '../../core/electric-vehicle.service';

@Component({
  selector: 'app-euc-table',
  templateUrl: './euc-table.component.html',
  styleUrls: ['./euc-table.component.scss']
})
export class EucTableComponent implements OnInit {

  constructor(private electricVehicleService: ElectricVehicleService) {
  }

  faColumns = faColumns;
  faCheck = faCheckSquare;
  faUncheck = faSquare;

  @LocalStored(9)
  config = {
    sort: {active: null, direction: 'asc'},
    displayedColumns: ['brand', 'android', 'battery-capacity', 'charging-time', 'distance-max', 'distance-min', 'factory-speed', 'front-light', 'gap', 'horn', 'id', 'input', 'android',
      'ios', 'ip-rating', 'max-slope', 'max-speed', 'model', 'operating-temperature-low', 'operating-temperature-top', 'output', 'payload', 'power-rating', 'rear-light', 'tire-pressure',
      'tire-size', 'turn-signal', 'weight'],
    pageIndex: 1,
    filter: null
  };

  columns: string[] = ['android', 'battery-capacity', 'brand', 'charging-time', 'distance-max', 'distance-min', 'factory-speed', 'front-light', 'gap', 'horn', 'id', 'input', 'android',
    'ios', 'ip-rating', 'max-slope', 'max-speed', 'model', 'operating-temperature-low', 'operating-temperature-top', 'output', 'payload', 'power-rating', 'rear-light', 'tire-pressure',
    'tire-size', 'turn-signal', 'weight'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  ngOnInit() {
    this.electricVehicleService.getUnicycles().subscribe(unicycles => this.dataSource.data = unicycles);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sort.active = this.config.sort.active;
    this.dataSource.sort.direction = this.config.sort.direction as SortDirection;
    this.paginator.pageIndex = this.config.pageIndex;
    this.dataSource.filter = this.config.filter;
  }

  switchColumn(column: string) {
    const index = this.config.displayedColumns.indexOf(column);
    if (index === -1) {
      this.config.displayedColumns.push(column);
      this.config.displayedColumns.sort((a: string, b: string) => {
        return this.columns.indexOf(a) - this.columns.indexOf(b);
      });
    } else {
      this.config.displayedColumns.splice(index, 1);
    }
  }

  sortChange($event: Sort) {
    this.config.sort = $event;
  }

  changePage($event: PageEvent) {
    this.config.pageIndex = $event.pageIndex;
  }

  applyFilter() {
    this.dataSource.filter = this.config.filter.trim().toLowerCase();
  }

}
