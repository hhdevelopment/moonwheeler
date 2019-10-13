import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomepageComponent} from './main/homepage.component';
import {NavBarComponent} from './navbar/navbar.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'moonwheeler'}),
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [],
  entryComponents: [],
  exports: []
})
export class AppModule {
}
