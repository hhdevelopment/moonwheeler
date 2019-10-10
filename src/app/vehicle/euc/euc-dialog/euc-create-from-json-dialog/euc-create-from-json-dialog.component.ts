import {Component, OnInit} from '@angular/core';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {ElectricUnicycleService} from '../../../../core/service/electric-unicycle/electric-unicycle.service';
import {EucSavedSnackBarComponent} from '../../euc-snack-bar/euc-saved-snack-bar.component';

@Component({
  templateUrl: './euc-create-from-json-dialog.component.html',
  styles: []
})
export class EucCreateFromJsonDialogComponent implements OnInit {

  faSave = faSave;
  json: string;

  constructor(public dialogRef: MatDialogRef<EucCreateFromJsonDialogComponent>,
              private snackBar: MatSnackBar,
              private service: ElectricUnicycleService) {
  }

  ngOnInit() {
  }


  save() {
    const item: Partial<ElectricUnicycle> = JSON.parse(this.json);
    this.service.create(item).subscribe(() => {
      this.snackBar.openFromComponent(EucSavedSnackBarComponent, {
        duration: 2000,
      });
      this.dialogRef.close();
    });
  }
}
