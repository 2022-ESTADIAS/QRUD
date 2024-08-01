import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRegulationsComponent } from './driver-regulations.component';

describe('DriverRegulationsComponent', () => {
  let component: DriverRegulationsComponent;
  let fixture: ComponentFixture<DriverRegulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverRegulationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverRegulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
