import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCamionesPorClienteComponent } from './ver-camiones-por-cliente.component';

describe('VerCamionesPorClienteComponent', () => {
  let component: VerCamionesPorClienteComponent;
  let fixture: ComponentFixture<VerCamionesPorClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerCamionesPorClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCamionesPorClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
