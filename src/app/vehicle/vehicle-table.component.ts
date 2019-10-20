import {OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, PageEvent, Sort, SortDirection} from '@angular/material';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {SelectionChange, SelectionModel} from '@angular/cdk/collections';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {faCheckSquare, faSquare} from '@fortawesome/free-regular-svg-icons';
import {faColumns, faGripLines, faPencilAlt, faTimes} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../core/service/user/user.service';
import {ElectricAbstractService} from '../core/service/electric-vehicle/electric-abstract.service';
import {ConfirmDeleteDialogComponent, CreateFromJsonDialogComponent} from './dialog';
import {catchError, filter, flatMap} from 'rxjs/operators';
import {DeletedSnackBarComponent, SavedSnackBarComponent} from './snack-bar';
import {Observable, of} from 'rxjs';
import {EditDialogComponent} from './dialog/edit-dialog.component';
import {RatingsUserService} from '../core/service/user/ratings-user.service';

export abstract class VehicleTableComponent<T extends ElectricVehicle> implements OnInit {

  protected constructor(
    private ratingsUserService: RatingsUserService,
    protected snackBar: MatSnackBar,
    private afStorage: AngularFireStorage,
    protected electricVehicleService: ElectricAbstractService<T>,
    private userService: UserService,
    protected dialog: MatDialog
  ) {
  }

  faColumns = faColumns;
  faCheck = faCheckSquare;
  faUncheck = faSquare;
  faGripLines = faGripLines;
  faPencilAlt = faPencilAlt;
  faTimes = faTimes;
  selection: SelectionModel<string>;
  expandedElement: T | null;
  overflownElement: T | null;
  url: string;
  claims: Partial<Claims>;
  ratingsUser: Partial<RatingsUser> = {};

  uid: string;
  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatPaginator, {static: true})
  paginator: MatPaginator;

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  abstract getConfig();

  abstract openEditSpecificDialog(item: Partial<T>): MatDialogRef<EditDialogComponent<T>, Partial<T>>;

  ngOnInit() {
    this.ratingsUserService.getRatings().subscribe((ratingsUser: RatingsUser) => {
      this.ratingsUser = ratingsUser || {};
    });
    this.userService.getClaims().subscribe((claims: Claims) => {
      this.claims = claims;
    });
    this.userService.getUid().subscribe((uid: string) => {
      this.uid = uid;
    });
    this.selection = new SelectionModel<string>(true, this.getConfig().visibleColumns);
    this.selection.changed.subscribe((selChange: SelectionChange<string>) => {
      this.getConfig().displayedColumns = selChange.source.selected;
      this.getConfig().visibleColumns = selChange.source.selected;
      this.getConfig().displayedColumns.sort((a: string, b: string) => {
        return this.getConfig().columns.indexOf(a) - this.getConfig().columns.indexOf(b);
      });
      this.getConfig().displayedColumns.push('actions');
    });
    this.electricVehicleService.list().subscribe(electricVehicles => this.dataSource.data = electricVehicles);
//    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sort.active = this.getConfig().sort.active;
    this.dataSource.sort.direction = this.getConfig().sort.direction as SortDirection;
//    this.paginator.pageIndex = this.eucConfig.pageIndex;
//    this.paginator.pageSize = this.eucConfig.pageSize;
    this.dataSource.filter = this.getConfig().filter;
  }

  sortChange($event: Sort) {
    this.getConfig().sort = $event;
  }


  changePage($event: PageEvent) {
    this.getConfig().pageSize = $event.pageSize;
    this.getConfig().pageIndex = $event.pageIndex;
  }

  applyFilter() {
    this.dataSource.filter = this.getConfig().filter.trim().toLowerCase();
  }

  drop($event: CdkDragDrop<string[]>) {
    moveItemInArray(this.getConfig().columns, $event.previousIndex, $event.currentIndex);
    this.getConfig().displayedColumns.sort((a: string, b: string) => {
      return this.getConfig().columns.indexOf(a) - this.getConfig().columns.indexOf(b);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.getConfig().columns.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.getConfig().columns.forEach(row => this.selection.select(row));
  }

  enterItem($event: T) {
    if (this.expandedElement !== $event) {
      this.overflownElement = $event;
    }
  }

  leaveItem() {
    this.overflownElement = undefined;
  }

  clickItem($event: T) {
    this.url = null;
    if (this.expandedElement !== $event) {
      if (!!$event.thumbnail) {
        const ref: AngularFireStorageReference = this.afStorage.ref($event.thumbnail);
        ref.getDownloadURL().pipe(
          catchError(err => of(null))
        ).subscribe(url => {
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

  contribuableIsUser(): boolean {
    return this.expandedElement && this.expandedElement.contributors && this.expandedElement.contributors[0].uid === this.uid;
  }

  actionOnItem(event: { item: any, action: string }) {
    if ('edit' === event.action) {
      this.openEditVehicleDialog(event.item, false);
    } else if ('delete' === event.action) {
      this.dialog.open<ConfirmDeleteDialogComponent<T>, T, boolean>(ConfirmDeleteDialogComponent, {width: '400px', data: event.item}).afterClosed().pipe(
        filter((res: boolean) => res),
        flatMap((res: boolean) => {
          return this.deletePicture(event.item.thumbnail);
        }),
        flatMap(() => {
          console.log(event.item);
          return this.electricVehicleService.delete(event.item);
        })
      ).subscribe(() => {
        this.snackBar.openFromComponent(DeletedSnackBarComponent, {duration: 2000});
      });
    }
  }

  private deletePicture(path: string): Observable<any> {
    if (!!path) {
      const ref: AngularFireStorageReference = this.afStorage.ref(path);
      try {
        return ref.delete().pipe(
          catchError(err => of(null))
        );
      } catch (e) {
        return of(null);
      }
    } else {
      return of(null);
    }
  }

  openEditVehicleDialog(item: Partial<T>, json: boolean = false) {
    let afterClosed: Observable<Partial<T>>;
    if (json) {
      afterClosed = this.dialog.open<CreateFromJsonDialogComponent<T>, null, Partial<T>>(CreateFromJsonDialogComponent, {width: '90%'}).afterClosed();
    } else {
      afterClosed = this.openEditSpecificDialog(item).afterClosed();
    }
    afterClosed.pipe(
      filter((newItem: Partial<T>) => !!newItem),
      flatMap((newItem: Partial<T>) => {
        if (!!newItem.id) {
          return this.electricVehicleService.update(newItem);
        } else {
          return this.electricVehicleService.create(newItem);
        }
      })
    ).subscribe(() => {
      this.snackBar.openFromComponent(SavedSnackBarComponent, {duration: 2000});
    });
  }
}
