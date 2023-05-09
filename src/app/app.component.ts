import { Component } from '@angular/core';
import { faBuysellads } from '@fortawesome/free-brands-svg-icons';
import { faBagShopping, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from './shared/services/modal.service';
import { CartService } from './data-access/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public modalService: ModalService, private cartService: CartService) {
  }

  cartCount$ = this.cartService.items$

  shop = faBagShopping;
  cart = faCartShopping;
}
