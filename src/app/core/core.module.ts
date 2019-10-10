import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  declarations: [],
})
export class CoreModule {
}
