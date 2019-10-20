import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehicleMainComponent} from './main/vehicle-main.component';
import {VehicleRoutingModule} from './vehicle-routing.module';
import {SharedModule} from '../shared/shared.module';
import {EV_SNACK_BAR_COMPONENTS} from './snack-bar';
import {EUC_COMPONENTS} from './euc';
import {ESCOOTER_COMPONENTS} from './escooter';
import {EV_DIALOG_COMPONENTS} from './dialog';
import {EucEditDialogComponent} from './euc/euc-edit-dialog/euc-edit-dialog.component';
import {EscooterEditDialogComponent} from './escooter/escooter-edit-dialog/escooter-edit-dialog.component';
import {VehicleNavComponent} from './nav/vehicle-nav.component';


@NgModule({
  declarations: [VehicleMainComponent, VehicleNavComponent, EV_DIALOG_COMPONENTS,
    EUC_COMPONENTS, EucEditDialogComponent, EV_SNACK_BAR_COMPONENTS,
    ESCOOTER_COMPONENTS, EscooterEditDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VehicleRoutingModule,
  ],
  entryComponents: [EV_DIALOG_COMPONENTS,
    EV_SNACK_BAR_COMPONENTS, EucEditDialogComponent, EscooterEditDialogComponent]
})
export class VehicleModule {
}
