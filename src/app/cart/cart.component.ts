import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Products } from '../models/products';
import { Item } from '../models/item';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  product: Products;
  public items: Item = new Item();
  item;
  
  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.checkTotal();
  }

  deleteItem(item){
    this.cartService.deleteItem(item);
    let domItem = document.getElementById(`cart-item`+item.product.id);
    domItem.classList.add('delete-style');
    //console.log(domItem);
    setTimeout(() =>{
    domItem.parentNode.removeChild(domItem);
    },1000);
    this.checkTotal();
  }
  addQty(item){
    this.cartService.addQty(item);
    //ADD TO TOTAL
    this.cartService.checkTotal();
    //ADD + STYLE
    let domItem = document.getElementById(`cart-item`+item.product.id);
    domItem.style.background="rgba(0, 151, 33, 0.616)";
    setTimeout(() =>{
    domItem.style.background="";
    },200);
  }
  subQty(item){
    //Subtract 1 from Item
    this.cartService.subQty(item);
    //Subtract from Total
    this.cartService.checkTotal();
    //Subtract - STYLE
    let domItem = document.getElementById(`cart-item`+item.product.id);
    domItem.style.background="rgba(0, 103, 151, 0.616)";
    setTimeout(() =>{
    domItem.style.background="";
    },200);
  }
  checkTotal()
  {
    this.cartService.checkTotal();
  }
  clearCart(){
    this.cartService.clearCart();
    let domItem = document.getElementById(`item-container`);
    domItem.classList.add('delete-style');
    setTimeout(() =>{
    domItem.parentNode.removeChild(domItem);
    },1000);
    this.checkTotal();
  }
  updateImageUrl(item)
  {
    this.cartService.updateImageUrl(item);
  }
  gotoCheckOut(){
    this.router.navigateByUrl(`/checkout`);
  }

}
