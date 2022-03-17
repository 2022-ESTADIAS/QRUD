import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalEliminadoComponent } from './personal-eliminado.component';

describe('PersonalEliminadoComponent', () => {
  let component: PersonalEliminadoComponent;
  let fixture: ComponentFixture<PersonalEliminadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalEliminadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalEliminadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
