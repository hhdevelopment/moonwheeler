import {Component, Input, OnInit} from '@angular/core';
import {AngularFireFunctions} from '@angular/fire/functions';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar} from '@angular/material';
import {UserSavedSnackBarComponent} from '../user-saved-snack-bar.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  faSave = faSave;

  _claims: Partial<Claims>;

  guest: Claims = {
    allowCreate: false,
    allowCreateFromJson: false,
    allowDelete: false,
    allowUpdate: false,
    allowViewAuthor: false,
    allowEditClaims: false,
    admin: false
  };

  @Input()
  set claims(claims: Partial<Claims>) {
    this._claims = Object.assign(this.guest, claims);
  }

  get claims(): Partial<Claims> {
    return this._claims;
  }

  @Input()
  uid: string;

  @Input()
  photoURL: string;

  Object = Object;

  constructor(
    private snackBar: MatSnackBar,
    private afFunctions: AngularFireFunctions) {
  }

  ngOnInit() {
    this.claims = Object.assign({}, this.guest);
  }

  saveClaims() {
    this.afFunctions.httpsCallable('setClaims')({uid: this.uid, claims: this.claims}).subscribe((value: any) => {
      this.snackBar.openFromComponent(UserSavedSnackBarComponent, {
        data: {photoURL : this.photoURL},
        duration: 2000,
      });
    });
  }
}
