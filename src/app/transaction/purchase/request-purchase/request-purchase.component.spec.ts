import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPurchaseComponent } from './request-purchase.component';

describe('RequestPurchaseComponent', () => {
  let component: RequestPurchaseComponent;
  let fixture: ComponentFixture<RequestPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
