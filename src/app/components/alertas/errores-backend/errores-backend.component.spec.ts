import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroresBackendComponent } from './errores-backend.component';

describe('ErroresBackendComponent', () => {
  let component: ErroresBackendComponent;
  let fixture: ComponentFixture<ErroresBackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroresBackendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroresBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
