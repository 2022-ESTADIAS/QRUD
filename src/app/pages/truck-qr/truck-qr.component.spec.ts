import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckQrComponent } from './truck-qr.component';

describe('TruckQrComponent', () => {
  let component: TruckQrComponent;
  let fixture: ComponentFixture<TruckQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckQrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
