import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {UsersComponent} from './users/users.component';
import {MainComponent} from './main/main.component';
import {UserEditComponent} from './users/user-edit/user-edit.component';
import {UserSavedSnackBarComponent} from './users/user-saved-snack-bar.component';


@NgModule({
  declarations: [UsersComponent, MainComponent, UserEditComponent, UserSavedSnackBarComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  entryComponents: [UserSavedSnackBarComponent]
})
export class AdminModule {
}
