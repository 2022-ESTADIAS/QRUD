import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPersonalComponent } from './ver-personal.component';

describe('VerPersonalComponent', () => {
  let component: VerPersonalComponent;
  let fixture: ComponentFixture<VerPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
