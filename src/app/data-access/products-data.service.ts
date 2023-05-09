import { Injectable } from '@angular/core';
import { IProduct } from './interfaces/IProduct';
import { Observable, map, of } from 'rxjs';
import { products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  constructor() { }

  products$: Observable<IProduct[]> = of(products)

  getProduct(id: string) {
    return this.products$.pipe( map(products => products.find(product => product.id === id) as IProduct) )
  }
}
