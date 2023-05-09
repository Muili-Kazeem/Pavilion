import { Component } from '@angular/core';
import { ProductsDataService } from 'src/app/data-access/products-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor( private productService: ProductsDataService) {}

  products$ = this.productService.products$;
  currency$ = this.productService.currency$
}
