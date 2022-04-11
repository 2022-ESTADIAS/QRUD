import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscannerUsuarioComponent } from './escanner-usuario.component';

describe('EscannerUsuarioComponent', () => {
  let component: EscannerUsuarioComponent;
  let fixture: ComponentFixture<EscannerUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscannerUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscannerUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
