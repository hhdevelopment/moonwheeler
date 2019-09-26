import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {VehicleRoutingModule} from './vehicle-routing.module';
import {EucTableComponent} from './euc-table/euc-table.component';
import {SharedModule} from '../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [MainComponent, EucTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    VehicleRoutingModule
  ]
})
export class VehicleModule { }
