import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ObjectsService} from '../../../core/service/objects/objects.service';
import {EditDialogComponent} from '../../dialog/edit-dialog.component';

@Component({
  selector: 'app-euc-edit-dialog',
  templateUrl: './euc-edit-dialog.component.html',
  styles: []
})
export class EucEditDialogComponent extends EditDialogComponent<ElectricUnicycle> implements OnInit {

  tireSizes: number[] = [14, 15, 16, 17, 18, 19, 20];

  constructor(dialogRef: MatDialogRef<EucEditDialogComponent>,
              snackBar: MatSnackBar,
              objectsService: ObjectsService,
              @Inject(MAT_DIALOG_DATA) data: Partial<ElectricUnicycle>) {
    super(dialogRef, snackBar, objectsService, data);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
