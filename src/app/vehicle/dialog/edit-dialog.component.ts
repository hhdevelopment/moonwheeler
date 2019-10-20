import {OnInit} from '@angular/core';
import {faCalendarCheck, faSave, faTimes} from '@fortawesome/free-solid-svg-icons';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {ObjectsService} from '../../core/service/objects/objects.service';
import {Observable, of} from 'rxjs';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {catchError} from 'rxjs/operators';

export class EditDialogComponent<T extends ElectricVehicle> implements OnInit {

  faSave = faSave;
  faCalendarCheck = faCalendarCheck;

  descriptionEdit = true;
  currentYear: number;
  item: Partial<T>;

  pictureUpdated = false;
  brands: string[];
  tireTypes: string[];
  batteryTypes: string[];
  ipRatings: string[];
  years: number[];
  weights: number[] = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
  payloads: number[] = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];

  constructor(public dialogRef: MatDialogRef<EditDialogComponent<T>>,
              private afStorage: AngularFireStorage,
              private snackBar: MatSnackBar,
              private objectsService: ObjectsService,
              private data: Partial<T>) {
  }

  ngOnInit(): void {
    this.item = {...this.data};
    this.objectsService.listIpRatings().subscribe((ipRatings: string[]) => {
      this.ipRatings = ipRatings.sort();
    });
    this.objectsService.listBrands().subscribe((brands: string[]) => {
      this.brands = brands.sort();
    });
    this.objectsService.listTireTypes().subscribe((tireTypes: string[]) => {
      this.tireTypes = tireTypes.sort();
    });
    this.objectsService.listBatteryTypes().subscribe((batteryTypes: string[]) => {
      this.batteryTypes = batteryTypes.sort();
    });
    this.currentYear = new Date().getFullYear();
    this.years = [undefined, ...((start, end) => Array.from({length: (end - start)}, (v, k) => k + start))(2010, this.currentYear + 3)];
  }

  save() {
    this.dialogRef.close(this.item);
  }

  updateSpeeds($event: number | number[]) {
    this.item.factorySpeed = $event[0];
    this.item.maxSpeed = $event[1];
  }

  updateOperatingTemperatures($event: number | number[]) {
    this.item.operatingTemperatureLow = $event[0];
    this.item.operatingTemperatureTop = $event[1];
  }

  updateConnection($event: string[]) {
    this.item.connections = $event;
  }

  updatePicture($event: string) {
    this.item.thumbnail = $event;
    this.pictureUpdated = true;
  }

  cancel() {
    if (this.pictureUpdated) {
      this.deletePicture(this.item.thumbnail).subscribe(() => {
        this.item.thumbnail = this.data.thumbnail;
        this.dialogRef.close();
      });
    } else {
      this.dialogRef.close();
    }
  }

  private deletePicture(path: string): Observable<any> {
    if (!!path) {
      const ref: AngularFireStorageReference = this.afStorage.ref(path);
      return ref.delete().pipe(
        catchError(err => of(null))
      );
    } else {
      return of(null);
    }
  }
}
