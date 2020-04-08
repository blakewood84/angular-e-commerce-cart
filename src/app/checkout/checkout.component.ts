import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public items: Item = new Item();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getItems();
    this.checkTotal();
  }
  checkTotal(){
    this.cartService.checkTotal();
  }
  getItems(){
    this.items = JSON.parse(localStorage.getItem('cart'));
    console.log(this.items);
  }

}
