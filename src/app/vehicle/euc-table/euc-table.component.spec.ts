import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EucTableComponent } from './evc-table.component';

describe('EvcTableComponent', () => {
  let component: EucTableComponent;
  let fixture: ComponentFixture<EucTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EucTableComponent ]
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
