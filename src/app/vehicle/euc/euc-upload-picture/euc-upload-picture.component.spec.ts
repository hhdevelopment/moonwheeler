import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EucUploadPictureComponent } from './euc-upload-picture.component';

describe('EucUploadPictureComponent', () => {
  let component: EucUploadPictureComponent;
  let fixture: ComponentFixture<EucUploadPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EucUploadPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EucUploadPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
