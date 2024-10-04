import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCamionesComponent } from './asignar-camiones.component';

describe('AsignarCamionesComponent', () => {
  let component: AsignarCamionesComponent;
  let fixture: ComponentFixture<AsignarCamionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarCamionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarCamionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
