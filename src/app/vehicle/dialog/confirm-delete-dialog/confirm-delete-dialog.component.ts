import {Component, Inject} from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  templateUrl: './confirm-delete-dialog.component.html',
  styles: []
})
export class ConfirmDeleteDialogComponent<T> {

  faTimes = faTimes;

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent<T>>,
              @Inject(MAT_DIALOG_DATA) public data: Partial<T>) {
  }

  delete() {
    this.dialogRef.close(true);
  }
}
