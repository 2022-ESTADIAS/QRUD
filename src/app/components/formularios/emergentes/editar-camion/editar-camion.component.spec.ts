import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCamionComponent } from './editar-camion.component';

describe('EditarCamionComponent', () => {
  let component: EditarCamionComponent;
  let fixture: ComponentFixture<EditarCamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCamionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
