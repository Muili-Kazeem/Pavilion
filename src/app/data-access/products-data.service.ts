import { Injectable } from '@angular/core';
import { IProduct } from './interfaces/IProduct';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { products } from './products';
import { currencies } from './currencies';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  constructor() { }

  products$: Observable<IProduct[]> = of(products);

  currencies$: Observable<string[]> = of(currencies);

  private currencySubject = new BehaviorSubject<string>("");
  currency$ = this.currencySubject.asObservable();
  changeCurrency(currency: string) {
    this.currencySubject.next(currency);
  }

  getProduct(id: string) {
    return this.products$.pipe( map(products => products.find(product => product.id === id) as IProduct) )
  }
}
