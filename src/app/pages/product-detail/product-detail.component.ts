import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription, combineLatest, map, switchMap, tap } from 'rxjs';
import { CartService } from 'src/app/data-access/cart.service';
import { ICartProduct } from 'src/app/data-access/interfaces/ICart';
import { IProduct } from 'src/app/data-access/interfaces/IProduct';
import { ProductsDataService } from 'src/app/data-access/products-data.service';
import { iconSelect } from 'src/app/utils/funcs/iconSelect';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnDestroy {
  constructor( private route: ActivatedRoute, private router: Router, private productService: ProductsDataService, private cartService: CartService ) {}

  productId!: string;
  itemSub!: Subscription;
  currency$ = this.productService.currency$;

  icon(currency: string) {
    return iconSelect(currency)
  }

  product$: Observable<IProduct> = this.route.paramMap.pipe(
    switchMap(route => {
      this.productId = route.get("id")!;
      return this.productService.getProduct(this.productId)
    })
    // tap(all => console.log(all))
  )

  private sizeSelectedSubject = new BehaviorSubject<string>("");
  sizeSelected$ = this.sizeSelectedSubject.asObservable();
  onSizeSelected(size: string) {
    this.sizeSelectedSubject.next(size)
  }

  private colourSelectedSubject = new BehaviorSubject<string>("");
  colourSelected$ = this.colourSelectedSubject.asObservable();
  onColourSelected(colour: string) {
    this.colourSelectedSubject.next(colour)
  }

  cartItem$: Observable<ICartProduct | undefined> = this.cartService.getCartItem(this.product$).pipe(
    // tap(all => console.log(all)),
    tap(all => {
      this.colourSelectedSubject.next(all ? all.selectedColour! : "");
      this.sizeSelectedSubject.next(all ? all.selectedSize! : "");
    })
  )

  addToCart() {
    this.itemSub = combineLatest([this.product$, this.colourSelected$, this.sizeSelected$]).pipe(
      map(([item, itemColour, itemSize]) => ({
        itemId: item.id,
        // Look into fixing count
        count: 1,
        itemName: item.name,
        brand: item.brand,
        shortDescription: item.shortDescription,
        description: item.description,
        selectedSize: itemSize,
        selectedColour: itemColour,
        price: item.price,
        inStock: item.inStock,
      } as ICartProduct)),
      tap(all => console.log("Saved"))
    ).subscribe((item) => { this.cartService.addToCart(item) })
  }

  ngOnDestroy(): void {
    if (this.itemSub) {
      this.itemSub.unsubscribe()
    }
  }

}
