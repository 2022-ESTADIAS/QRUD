import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecerContrasenaEmailComponent } from './restablecer-contrasena-email.component';

describe('RestablecerContrasenaEmailComponent', () => {
  let component: RestablecerContrasenaEmailComponent;
  let fixture: ComponentFixture<RestablecerContrasenaEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestablecerContrasenaEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestablecerContrasenaEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
