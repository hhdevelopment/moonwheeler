import {Component, Inject} from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {EscooterDeletedSnackBarComponent} from '../../escooter-snack-bar';
import {ElectricScooterService} from '../../../../core/service/electric-vehicle/electric-scooter.service';

@Component({
  templateUrl: './escooter-confirm-delete-dialog.component.html',
  styles: []
})
export class EscooterConfirmDeleteDialogComponent {

  faTimes = faTimes;

  constructor(public dialogRef: MatDialogRef<EscooterConfirmDeleteDialogComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: ElectricUnicycleConfirmDeleteData,
              private service: ElectricScooterService) {
  }

  delete() {
    this.service.delete(this.data.item).subscribe(() => {
      this.snackBar.openFromComponent(EscooterDeletedSnackBarComponent, {
        duration: 2000,
      });
      this.dialogRef.close();
    });
  }
}
