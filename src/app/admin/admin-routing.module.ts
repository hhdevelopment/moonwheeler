import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users/users.component';
import {MainComponent} from './main/main.component';

const routes: Routes = [
    {
      path: '', component: MainComponent, children: [
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
