import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrasenaEmailComponent } from './contrasena-email.component';

describe('ContrasenaEmailComponent', () => {
  let component: ContrasenaEmailComponent;
  let fixture: ComponentFixture<ContrasenaEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContrasenaEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContrasenaEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
