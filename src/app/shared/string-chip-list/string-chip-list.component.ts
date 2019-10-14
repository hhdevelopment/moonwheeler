import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {map} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {ObjectsService} from '../../core/service/objects/objects.service';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-string-chip-list',
  templateUrl: './string-chip-list.component.html',
  styles: []
})
export class StringChipListComponent implements OnInit {

  _value: string[] = [];
  faTimes = faTimes;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  valueCtrl = new FormControl();
  filteredValue: Observable<string[]>;

  @Output()
  changeValue: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Input()
  set value(conn: string[]) {
    this._value = conn || [];
  }

  get value(): string[] {
    return this._value;
  }

  allValue: string[] = [];

  @ViewChild('valueInput', {static: false})
  valueInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false})
  matAutocomplete: MatAutocomplete;

  constructor(
    private objectsService: ObjectsService,
  ) {
  }

  ngOnInit() {
    this.objectsService.listAppConnectionTypes().subscribe((connections: string[]) => {
      this.allValue = connections.sort();
    });
    this.filteredValue = this.valueCtrl.valueChanges.pipe(
      map((conn: string | null) => conn ? this._filter(conn) : this.allValue.slice())
    );
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      // Add our connection
      if ((value || '').trim()) {
        this.value.push(value.trim());
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.changeValue.emit(this.value);
      this.valueCtrl.setValue(null);
    }
  }

  remove(fruit: string): void {
    const index = this.value.indexOf(fruit);
    if (index >= 0) {
      this.value.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.value.push(event.option.viewValue);
    this.valueInput.nativeElement.value = '';
    this.valueCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allValue.filter(conn => conn.toLowerCase().indexOf(filterValue) === 0);
  }
}
