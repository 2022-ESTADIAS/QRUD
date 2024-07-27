import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTransportistasComponent } from './ver-transportistas.component';

describe('VerTransportistasComponent', () => {
  let component: VerTransportistasComponent;
  let fixture: ComponentFixture<VerTransportistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTransportistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTransportistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
