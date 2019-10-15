import {Component, OnInit} from '@angular/core';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {MatDialogRef} from '@angular/material';

@Component({
  templateUrl: './create-from-json-dialog.component.html',
  styles: []
})
export class CreateFromJsonDialogComponent<T extends ElectricVehicle> implements OnInit {

  faSave = faSave;
  json: string;

  constructor(
    public dialogRef: MatDialogRef<CreateFromJsonDialogComponent<T>>) {
  }

  ngOnInit() {
  }


  save() {
    const item: Partial<T> = JSON.parse(this.json);
    this.dialogRef.close(item);
  }
}
