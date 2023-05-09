import { Injectable } from '@angular/core';
import { ICartDetail, ICartProduct } from './interfaces/ICart';
import { BehaviorSubject, Observable, combineLatest, map, of, switchMap, tap } from 'rxjs';
import { IProduct } from './interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor() { }

  private itemsSubject = new BehaviorSubject<ICartProduct[]>([]);
  items$ = this.itemsSubject.asObservable();

  items: ICartProduct[] = [];

  addToCart(cartItem: ICartProduct) {
    const existingItem = this.items.find(item => item.itemId === cartItem.itemId );
    if (existingItem) {
      const reCalculatedCartItem = this.reCalculatePrice(cartItem);
      const otherItems = this.items.filter(item => item.itemId !== cartItem.itemId);
      this.items = [...otherItems, reCalculatedCartItem]
    } else {
      const reCalculatedCartItem = this.reCalculatePrice(cartItem);
      this.items.push(reCalculatedCartItem)
    };
    this.itemsSubject.next(this.items)
  }

  clearCart() {
    this.items = [];
    this.itemsSubject.next(this.items);
  }

  getCart() {
    return of(this.items)
  }

  getCartItem(product: Observable<IProduct>) {
    return product.pipe(
      map( product => this.items.find(cartItem => cartItem.itemId === product.id))
    )
  }

  reCalculatePrice(item: ICartProduct): ICartProduct {
    const newItem: ICartProduct = { ...item, totalPrice: item.count * item.price };
    return newItem
  }

  totalPrice$ = this.items$.pipe(
    map(cartItems => {
      return cartItems.reduce((acc, cartItem) => {
        acc += cartItem.totalPrice ? cartItem.totalPrice : 0;
        return acc;
      }, 0 as number)
    })
  )

  tax$ = this.totalPrice$.pipe(
    map(totalPrice => totalPrice * 0.21 )
  )

  itemsCount$ = this.items$.pipe(
    map(cartItems => cartItems.reduce((acc, cartItem) => {
      acc += cartItem.count ? cartItem.count : 0;
      return acc;
    }, 0 as number))
  );

  totalCart$ = combineLatest([this.items$, this.totalPrice$, this.tax$]).pipe(
    map(([cartItems, totalPrice, tax]) => ({
      cart: cartItems,
      totalAmount: totalPrice,
      tax,
    } as ICartDetail)),
    // tap(all => console.log(all))
  )

}
