import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {VehicleRoutingModule} from './vehicle-routing.module';
import {SharedModule} from '../shared/shared.module';
import {EV_SNACK_BAR_COMPONENTS} from './snack-bar';
import {EUC_COMPONENTS} from './euc';
import {ESCOOTER_COMPONENTS} from './escooter';
import {ESCOOTER_SNACK_BAR_COMPONENTS} from './escooter/escooter-snack-bar';
import {EV_DIALOG_COMPONENTS} from './dialog';
import {EucEditDialogComponent} from './euc/euc-edit-dialog/euc-edit-dialog.component';
import {EscooterEditDialogComponent} from './escooter/escooter-edit-dialog/escooter-edit-dialog.component';


@NgModule({
  declarations: [MainComponent, EV_DIALOG_COMPONENTS,
    EUC_COMPONENTS, EucEditDialogComponent, EV_SNACK_BAR_COMPONENTS,
    ESCOOTER_COMPONENTS, EscooterEditDialogComponent, ESCOOTER_SNACK_BAR_COMPONENTS
  ],
  imports: [
    CommonModule,
    SharedModule,
    VehicleRoutingModule,
  ],
  entryComponents: [EV_DIALOG_COMPONENTS,
    EV_SNACK_BAR_COMPONENTS, EucEditDialogComponent,
    ESCOOTER_SNACK_BAR_COMPONENTS, EscooterEditDialogComponent]
})
export class VehicleModule {
}
