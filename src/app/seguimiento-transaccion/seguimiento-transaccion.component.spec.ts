import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoTransaccionComponent } from './seguimiento-transaccion.component';

describe('SeguimientoTransaccionComponent', () => {
  let component: SeguimientoTransaccionComponent;
  let fixture: ComponentFixture<SeguimientoTransaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoTransaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
