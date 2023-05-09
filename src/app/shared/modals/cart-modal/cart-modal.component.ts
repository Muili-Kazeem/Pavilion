import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CartService } from 'src/app/data-access/cart.service';
import { ICartProduct } from 'src/app/data-access/interfaces/ICart';
import { ModalService } from '../../services/modal.service';
import { ProductsDataService } from 'src/app/data-access/products-data.service';
import { iconSelect } from 'src/app/utils/funcs/iconSelect';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {
  constructor(
    private cartService: CartService,
    public modalService: ModalService,
    private productService: ProductsDataService
    ) {}

  cart$!: Observable<ICartProduct[]>;
  totalPrice$: Observable<number> = this.cartService.totalPrice$;
  itemsCount$: Observable<number> = this.cartService.itemsCount$;
  currency$ = this.productService.currency$;

  icon(currency: string) { return iconSelect(currency) }

  ngOnInit(): void {
    this.cart$ = this.cartService.getCart().pipe(
    );
  }
}
