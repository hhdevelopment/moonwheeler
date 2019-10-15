import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ObjectsService} from '../../../core/service/objects/objects.service';
import {EditDialogComponent} from '../../dialog/edit-dialog.component';

@Component({
  selector: 'app-escooter-edit-dialog',
  templateUrl: './escooter-edit-dialog.component.html',
  styles: []
})
export class EscooterEditDialogComponent extends EditDialogComponent<ElectricScooter> implements OnInit {

  tireSizes: number[] = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11];

  constructor(dialogRef: MatDialogRef<EscooterEditDialogComponent>,
              snackBar: MatSnackBar,
              objectsService: ObjectsService,
              @Inject(MAT_DIALOG_DATA) data: Partial<ElectricScooter>) {
    super(dialogRef, snackBar, objectsService, data);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
