import { Component, Input } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/data-access/interfaces/IProduct';
import { iconSelect } from 'src/app/utils/funcs/iconSelect';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: IProduct;
  @Input() currency$!: Observable<string>;

  cart = faShoppingCart;

  icon(currency: string) { return iconSelect(currency) }
}
