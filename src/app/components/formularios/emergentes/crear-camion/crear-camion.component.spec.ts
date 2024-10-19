import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCamionComponent } from './crear-camion.component';

describe('CrearCamionComponent', () => {
  let component: CrearCamionComponent;
  let fixture: ComponentFixture<CrearCamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCamionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
