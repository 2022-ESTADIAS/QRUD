import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscannerQRComponent } from './escanner-qr.component';

describe('EscannerQRComponent', () => {
  let component: EscannerQRComponent;
  let fixture: ComponentFixture<EscannerQRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscannerQRComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscannerQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
