import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {filter, map} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {ObjectsService} from '../../../core/service/objects/objects.service';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-euc-connections-chip-list',
  templateUrl: './euc-connections-chip-list.component.html',
  styles: []
})
export class EucConnectionsChipListComponent implements OnInit {
  faTimes = faTimes;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  connCtrl = new FormControl();
  filteredConnexions: Observable<string[]>;
  connections: string[] = [];
  allConnections: string[] = [];

  @ViewChild('connInput', {static: false})
  connInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false})
  matAutocomplete: MatAutocomplete;

  constructor(
    private objectsService: ObjectsService,
  ) { }

  ngOnInit() {
    this.objectsService.listAppConnectionTypes().subscribe((connections: string[]) => {
      this.allConnections = connections.sort();
    });
    this.filteredConnexions = this.connCtrl.valueChanges.pipe(
      map((conn: string | null) => conn ? this._filter(conn) : this.allConnections.slice())
    );
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      // Add our connection
      if ((value || '').trim()) {
        this.connections.push(value.trim());
      }
      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.connCtrl.setValue(null);
    }
  }
  remove(fruit: string): void {
    const index = this.connections.indexOf(fruit);
    if (index >= 0) {
      this.connections.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.connections.push(event.option.viewValue);
    this.connInput.nativeElement.value = '';
    this.connCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    console.log(value);
    const filterValue = value.toLowerCase();
    return this.allConnections.filter(conn => conn.toLowerCase().indexOf(filterValue) === 0);
  }}
