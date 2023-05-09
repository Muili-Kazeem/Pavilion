import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CartService } from 'src/app/data-access/cart.service';
import { ICartProduct } from 'src/app/data-access/interfaces/ICart';
import { IProduct } from 'src/app/data-access/interfaces/IProduct';
import { ProductsDataService } from 'src/app/data-access/products-data.service';
import { iconSelect } from 'src/app/utils/funcs/iconSelect';

@Component({
  selector: 'app-cart-prop',
  templateUrl: './cart-prop.component.html',
  styleUrls: ['./cart-prop.component.scss']
})
export class CartPropComponent implements OnInit {

  constructor(private productService: ProductsDataService, private cartService: CartService) {}


  @Input() cartItem!: ICartProduct;
  @Input() currency$!: Observable<string>;
  product$!: Observable<IProduct>;

  icon(currency: string) {
    return iconSelect(currency)
  }

  ngOnInit() {
    this.product$ = this.productService.getProduct(this.cartItem.itemId).pipe(
      // tap(all => console.log("Got cart product"))
    );

    this.colourSelectedSubject.next(this.cartItem.selectedColour ? this.cartItem.selectedColour : "");
    this.sizeSelectedSubject.next(this.cartItem.selectedSize ? this.cartItem.selectedSize : "");
  }

  private sizeSelectedSubject = new BehaviorSubject<string>("");
  sizeSelected$ = this.sizeSelectedSubject.asObservable();
  onSizeSelected(size: string) {
    this.sizeSelectedSubject.next(size);
    const newItem: ICartProduct = { ...this.cartItem, selectedSize: size };
    this.cartService.addToCart(newItem);
  }

  private colourSelectedSubject = new BehaviorSubject<string>("");
  colourSelected$ = this.colourSelectedSubject.asObservable();
  onColourSelected(colour: string) {
    this.colourSelectedSubject.next(colour);
    const newItem: ICartProduct = { ...this.cartItem, selectedColour: colour };
    this.cartService.addToCart(newItem);
  }

  increaseCount() {
    const newCount = this.cartItem.count += 1;
    const newItem: ICartProduct = { ...this.cartItem, count: newCount };
    this.cartService.addToCart(newItem);
  }

  decreaseCount() {
    const newCount = ( this.cartItem.count - 1 ) < 1 ? 1 : (this.cartItem.count -= 1);
    const newItem: ICartProduct = { ...this.cartItem, count: newCount };
    this.cartService.addToCart(newItem);
  }

}
