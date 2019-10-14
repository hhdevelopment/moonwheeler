import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main/main.component';
import {VehicleRoutingModule} from './vehicle-routing.module';
import {SharedModule} from '../shared/shared.module';
import {EUC_SNACK_BAR_COMPONENTS} from './euc/euc-snack-bar';
import {EUC_DIALOG_COMPONENTS} from './euc/euc-dialog';
import {EUC_COMPONENTS} from './euc';
import {ESCOOTER_COMPONENTS} from './escooter';
import {ESCOOTER_DIALOG_COMPONENTS} from './escooter/escooter-dialog';
import {ESCOOTER_SNACK_BAR_COMPONENTS} from './escooter/escooter-snack-bar';


@NgModule({
  declarations: [MainComponent,
    EUC_COMPONENTS, EUC_DIALOG_COMPONENTS, EUC_SNACK_BAR_COMPONENTS,
    ESCOOTER_COMPONENTS, ESCOOTER_DIALOG_COMPONENTS, ESCOOTER_SNACK_BAR_COMPONENTS
  ],
  imports: [
    CommonModule,
    SharedModule,
    VehicleRoutingModule,
  ],
  entryComponents: [EUC_DIALOG_COMPONENTS, EUC_SNACK_BAR_COMPONENTS, ESCOOTER_DIALOG_COMPONENTS, ESCOOTER_SNACK_BAR_COMPONENTS]
})
export class VehicleModule {
}
