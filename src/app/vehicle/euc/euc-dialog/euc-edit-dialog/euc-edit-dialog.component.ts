import {Component, Inject, OnInit} from '@angular/core';
import {faCalendarCheck, faEye, faPencilAlt, faSave, faTimes} from '@fortawesome/free-solid-svg-icons';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ElectricUnicycleService} from '../../../../core/service/electric-unicycle/electric-unicycle.service';
import {EucSavedSnackBarComponent} from '../../euc-snack-bar';
import {ObjectsService} from '../../../../core/service/objects/objects.service';

@Component({
  selector: 'app-euc-edit-dialog',
  templateUrl: './euc-edit-dialog.component.html',
  styleUrls: ['./euc-edit-dialog.component.scss']
})
export class EucEditDialogComponent implements OnInit {

  faSave = faSave;
  faEye = faEye;
  faPencilAlt = faPencilAlt;
  faTimes = faTimes;
  faCalendarCheck = faCalendarCheck;

  descriptionEdit = true;
  currentYear: number;
  item: Partial<ElectricUnicycle>;


  brands: string[];
  tireTypes: string[];
  batteryTypes: string[];
  ipRatings: string[];
  years: number[];
  weights: number[] = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
  payloads: number[] = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];
  tireSizes: number[] = [14, 15, 16, 17, 18, 19, 20];

  constructor(public dialogRef: MatDialogRef<EucEditDialogComponent>,
              private snackBar: MatSnackBar,
              private electricUnicycleService: ElectricUnicycleService,
              private objectsService: ObjectsService,
              @Inject(MAT_DIALOG_DATA) private data: ElectricUnicycleEditData) {
  }

  ngOnInit(): void {
    this.item = {...this.data.item};
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
    this.electricUnicycleService.update(this.item).subscribe(() => {
      this.snackBar.openFromComponent(EucSavedSnackBarComponent, {
        duration: 2000,
      });
      this.dialogRef.close();
    });
  }

  updateSpeeds($event: number | number[]) {
    this.item.factorySpeed = $event[0];
    this.item.maxSpeed = $event[1];
  }

  updateOperatingTemperatures($event: number | number[]) {
    this.item.operatingTemperatureLow = $event[0];
    this.item.operatingTemperatureTop = $event[1];
  }

}
