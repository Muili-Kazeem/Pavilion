import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPropComponent } from './cart-prop.component';

describe('CartPropComponent', () => {
  let component: CartPropComponent;
  let fixture: ComponentFixture<CartPropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartPropComponent]
    });
    fixture = TestBed.createComponent(CartPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
