import { Component } from '@angular/core';
import {  faBagShopping, faCartShopping, faChevronDown, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from './shared/services/modal.service';
import { CartService } from './data-access/cart.service';
import { ProductsDataService } from './data-access/products-data.service';
import { iconSelect } from './utils/funcs/iconSelect';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  icon(currency: string) {
    return iconSelect(currency)
  }

  constructor(
    public modalService: ModalService,
    private cartService: CartService,
    private productService: ProductsDataService
    ) { }

  cart$ = this.cartService.items$;
  currencies$ = this.productService.currencies$;

  shop = faBagShopping;
  cart = faCartShopping;
  money = faDollarSign;
  close = faChevronDown;

  private _currencyDropdown: boolean = false;
  get currencyDropdown() {
    return this._currencyDropdown;
  }
  set currencyDropdown(value: boolean) {
    this._currencyDropdown = value;
  }

  selectCurrency() {
    this.currencyDropdown = !this.currencyDropdown;
  }

  changeCurrency(currency: string) {
    this.productService.changeCurrency(currency);
  }
}
