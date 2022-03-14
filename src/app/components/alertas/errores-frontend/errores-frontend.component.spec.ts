import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroresFrontendComponent } from './errores-frontend.component';

describe('ErroresFrontendComponent', () => {
  let component: ErroresFrontendComponent;
  let fixture: ComponentFixture<ErroresFrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroresFrontendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroresFrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
