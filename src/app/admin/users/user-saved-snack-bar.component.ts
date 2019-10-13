import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  template: '<app-avatar size="lg" [photoURL]="data.photoURL"></app-avatar>&nbsp;&nbsp;&nbsp;<span i18n="@@USER_SAVED">Utilisateur sauvegardé</span>',
  styles: [],
})
export class UserSavedSnackBarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {photoURL: string}) {}
}
