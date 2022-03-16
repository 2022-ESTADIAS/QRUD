import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPersonalComponent } from './actualizar-personal.component';

describe('ActualizarPersonalComponent', () => {
  let component: ActualizarPersonalComponent;
  let fixture: ComponentFixture<ActualizarPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
