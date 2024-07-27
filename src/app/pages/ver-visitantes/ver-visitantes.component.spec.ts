import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerVisitantesComponent } from './ver-visitantes.component';

describe('VerVisitantesComponent', () => {
  let component: VerVisitantesComponent;
  let fixture: ComponentFixture<VerVisitantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerVisitantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerVisitantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
