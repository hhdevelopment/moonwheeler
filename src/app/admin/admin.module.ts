import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {UsersComponent} from './users/users.component';
import {AdminMainComponent} from './main/admin-main.component';
import {UserEditComponent} from './users/user-edit/user-edit.component';
import {UserSavedSnackBarComponent} from './users/user-saved-snack-bar.component';
import {AdminNavComponent} from './nav/admin-nav.component';


@NgModule({
  declarations: [UsersComponent, AdminMainComponent, AdminNavComponent, UserEditComponent, UserSavedSnackBarComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ],
  entryComponents: [UserSavedSnackBarComponent]
})
export class AdminModule {
}
