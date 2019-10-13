import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {EucMainComponent} from './euc';

const routes: Routes = [
    {
      path: '', component: MainComponent, children: [
        {path: '', redirectTo: 'euc', pathMatch: 'full'},
        {path: 'euc', component: EucMainComponent},
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
