import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosEliminadosComponent } from './usuarios-eliminados.component';

describe('UsuariosEliminadosComponent', () => {
  let component: UsuariosEliminadosComponent;
  let fixture: ComponentFixture<UsuariosEliminadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosEliminadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosEliminadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
