import { Injectable } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
declare let PaystackPop: any;

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private cartService: CartService, private router: Router) { }

  checkOut(amount: number) {
    let handler = PaystackPop.setup({
      key: 'pk_test_985afa171d7eb4219bf13d79bef62a67445e1b89', // Public test key
      email: "muiliquazeem@gmail.com",
      amount: amount * 100,
      // label: "Optional string that replaces customer email"
      onClose: () => {
        alert('Payment Window closed.');
      },
      callback: (response: any) => {
        let message = 'Payment complete! Reference: ' + response.reference;
        alert(message);
        this.cartService.clearCart();
        this.router.navigateByUrl("/")
      }
    });

    handler.openIframe();
  }
}
