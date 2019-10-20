import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VehicleMainComponent} from './main/vehicle-main.component';
import {EucMainComponent} from './euc';
import {EscooterMainComponent} from './escooter';

const routes: Routes = [
  {
    path: '', component: VehicleMainComponent, children: [
      {path: '', redirectTo: 'euc', pathMatch: 'full'},
      {path: 'euc', component: EucMainComponent},
      {path: 'escooter', component: EscooterMainComponent},
    ]
  }
];

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
