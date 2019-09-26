import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EucTableComponent} from './euc-table.component';
import {ElectricVehicleService} from '../../core/electric-vehicle.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';


describe('EvcTableComponent', () => {
  let component: EucTableComponent;
  let fixture: ComponentFixture<EucTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientModule,
        SharedModule
      ],
      declarations: [
        EucTableComponent
      ],
      providers: [
        ElectricVehicleService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EucTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
