import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {AdminMainComponent} from './main/admin-main.component';

const routes: Routes = [
    {
      path: '', component: AdminMainComponent, children: [
        {path: '', redirectTo: 'users', pathMatch: 'full'},
        {path: 'users', component: UsersComponent},
      ]
    }
  ]
;

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {
}
