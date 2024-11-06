import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitantesModalInfoComponent } from './visitantes-modal-info.component';

describe('VisitantesModalInfoComponent', () => {
  let component: VisitantesModalInfoComponent;
  let fixture: ComponentFixture<VisitantesModalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitantesModalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitantesModalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
