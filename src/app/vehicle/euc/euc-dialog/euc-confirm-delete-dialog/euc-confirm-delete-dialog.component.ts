import {Component, Inject} from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ElectricUnicycleService} from '../../../../core/service/electric-unicycle/electric-unicycle.service';
import {EucDeletedSnackBarComponent} from '../../euc-snack-bar';

@Component({
  templateUrl: './euc-confirm-delete-dialog.component.html',
  styles: []
})
export class EucConfirmDeleteDialogComponent {

  faTimes = faTimes;

  constructor(public dialogRef: MatDialogRef<EucConfirmDeleteDialogComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: ElectricUnicycleConfirmDeleteData,
              private service: ElectricUnicycleService) {
  }

  delete() {
    this.service.delete(this.data.item).subscribe(() => {
      this.snackBar.openFromComponent(EucDeletedSnackBarComponent, {
        duration: 2000,
      });
      this.dialogRef.close();
    });
  }
}
