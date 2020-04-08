import { Component, OnInit } from '@angular/core';
import { Products } from '../models/products';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApiService } from '../services/product-api.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  
  product: Products = new Products();
  
  constructor(private productApi: ProductApiService, private route: ActivatedRoute, private cartService: CartService ) { 
    this.getProductDetails(this.route.snapshot.params.id);
  }

  ngOnInit(): void {
    //this.getProductDetails(this.route.snapshot.params.id);
  }

  getProductDetails(id: string) {
    this.productApi.getProductById(id).subscribe((data: any) => {
      this.product = data;
      console.log(this.product);
    this.ratingDisplay();
    });
  }
  addToCart(product: Products) {
    this.cartService.addToCart(product);
    this.cartService.productAddedMsg();
    this.cartService.productAddedFlash();
  }
  ratingDisplay(){
    let rating_icon = "<i class='oi oi-star'></i>";
    let rating_dom = document.getElementById('rating');
    console.log(this.product.rating);
    if(this.product.rating == "1")
    {
      rating_dom.innerHTML = rating_icon;
    }
    else if(this.product.rating == "2")
    {
      rating_dom.innerHTML = rating_icon + rating_icon;
    }
    else if(this.product.rating == "3")
    {
      rating_dom.innerHTML = rating_icon + rating_icon + rating_icon;
    }
    else if(this.product.rating == "4")
    {
      rating_dom.innerHTML = rating_icon + rating_icon + rating_icon + rating_icon;
    }
    else if(this.product.rating == "5")
    {
      rating_dom.innerHTML = rating_icon + rating_icon + rating_icon + rating_icon + rating_icon;
    }
    else {
      rating_dom.innerHTML = "<em>Product is not rated</em>"
    }
  }
  updateImageUrl(product){
    this.productApi.updateImageUrl(product);
  }
}
