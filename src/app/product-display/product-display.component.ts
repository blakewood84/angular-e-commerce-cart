import { Component, OnInit } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { Products } from '../models/products';
import { Router } from '@angular/router';



@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {

  products: Products[];

  constructor(private productApi: ProductApiService, private router: Router) { }

  ngOnInit(): void {
    this.productApi.getProducts().subscribe(products => {
      this.products = products;
    });
    
  }

  gotoProduct(product){
    this.router.navigateByUrl(`/product-details/${product.id}`);
  }
  updateImageUrl(product){
    this.productApi.updateImageUrl(product);
  }
}
