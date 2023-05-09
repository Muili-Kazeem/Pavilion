import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { CartService } from 'src/app/data-access/cart.service';
import { CheckoutService } from 'src/app/data-access/checkout.service';
import { ICartDetail, ICartProduct } from 'src/app/data-access/interfaces/ICart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService, private checkoutService: CheckoutService) {}

  cart$!: Observable<ICartDetail>;
  itemsCount$! : Observable<number>;

  ngOnInit(): void {
    this.cart$ = this.cartService.totalCart$.pipe(
      // tap(all => console.log("In cart page"))
    );

    this.itemsCount$ = this.cartService.itemsCount$;
  }

  order(totalAmount: number) {
    console.log(`Before ceiling ${totalAmount}`);
    let amount = Math.ceil(totalAmount);
    console.log(`After ceiling ${amount}`);
    this.checkoutService.checkOut(amount)
  }

}
