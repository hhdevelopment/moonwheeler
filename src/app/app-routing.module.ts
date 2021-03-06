import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NavigationEnd, Router, RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './main/homepage.component';
import {filter} from 'rxjs/operators';
import {LocalStored} from '@hhangular/store';
import {SharedModule} from './shared/shared.module';
import {RedirectComponent} from './shared';
import {canActivate, hasCustomClaim} from '@angular/fire/auth-guard';

const adminOnly = hasCustomClaim('admin');

const routes: Routes = [
  {path: '', redirectTo: 'vehicles', pathMatch: 'full'},
  {path: 'main', component: HomepageComponent},
  {path: 'vehicles', loadChildren: './vehicle/vehicle.module#VehicleModule'},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', ...canActivate(adminOnly)},
  {path: '**', component: RedirectComponent},
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  declarations: [],
})
export class AppRoutingModule {
  @LocalStored(1, 'APP_CONFIG')
  currentRoute = {route: '/main'};


  constructor(
    private router: Router
  ) {
    this.surveyAndSaveLastSuccessRoute();
  }

  surveyAndSaveLastSuccessRoute() {
    this.router.events.pipe(
      filter((event: any) => {
        return !!event.urlAfterRedirects && !event.state;
      })
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute.route = event.urlAfterRedirects;
    });
  }
}
