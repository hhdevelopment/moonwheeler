import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared/shared.module';
import {EucTableComponent} from '../euc-table/euc-table.component';
import {ElectricVehicleService} from '../../core/electric-vehicle.service';
import {RouterModule} from '@angular/router';
import {VehicleRoutingModule} from '../vehicle-routing.module';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SharedModule,
        VehicleRoutingModule
      ],
      declarations: [
        MainComponent,
        EucTableComponent
      ],
      providers: [
        ElectricVehicleService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

/*  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
