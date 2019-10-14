import {APP_BASE_HREF, CommonModule, PlatformLocation} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {StoreModule} from '@hhangular/store';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClient} from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {LayoutModule} from '@angular/cdk/layout';
import {SHARED_COMPONENTS} from './index';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireFunctionsModule} from '@angular/fire/functions';
import {AngularFireAuthGuardModule} from '@angular/fire/auth-guard';

const MODULES: any[] = [
  FlexLayoutModule,
  MatTableModule,
  MatCheckboxModule,
  MatTabsModule,
  ScrollingModule,
  MatRadioModule,
  MatSliderModule,
  MatButtonModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTreeModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  FontAwesomeModule,
  MatPaginatorModule,
  DragDropModule,
  MatChipsModule,
  LayoutModule,
  MatSortModule,
  MatTooltipModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCardModule,
  MatProgressSpinnerModule
];
const FIRE_BASE = [
  AngularFireAuthModule,
  AngularFireAuthGuardModule,
  AngularFirestoreModule,
  AngularFireStorageModule,
  AngularFireFunctionsModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FIRE_BASE,
    MODULES,
    MarkdownModule.forRoot({loader: HttpClient}),
    StoreModule,
  ],
  exports: [
    MODULES,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule,
    StoreModule,
    FIRE_BASE,
    SHARED_COMPONENTS,
  ],
  declarations: [
    SHARED_COMPONENTS,
  ],
  providers: [
    {provide: APP_BASE_HREF, useFactory: (platformLocation: PlatformLocation) => platformLocation.getBaseHrefFromDOM(), deps: [PlatformLocation]},
//    {provide: USER_ID, useFactory: (userService: UserService) => userService.getUid(), deps: [UserService]},
  ],
})
export class SharedModule {
}
