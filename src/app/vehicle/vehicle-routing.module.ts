import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {EucTableComponent} from './euc/euc-table/euc-table.component';

const routes: Routes = [
    {
      path: '', component: MainComponent, children: [
        {path: '', redirectTo: 'euc', pathMatch: 'full'},
        {path: 'euc', component: EucTableComponent},
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
export class VehicleRoutingModule {
}
