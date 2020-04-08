import { Injectable, ɵConsole } from '@angular/core';
import { Products } from '../models/products';
import { Item } from '../models/item';;


@Injectable({
  providedIn: 'root'
})
export class CartService {

  product: Products;
  items: Item;

  constructor() { }

  addToCart(product: Products) {
    let local_storage;
    let itemsInCart = [];
    this.items = {
      product: product,
      quantity: 1,
    }
    if (localStorage.getItem('cart') == null) {
      local_storage = [];
      console.log("LOCALSTORAGE NULL", JSON.parse(localStorage.getItem('cart')));
      itemsInCart.push(this.items);
      localStorage.setItem('cart', JSON.stringify(itemsInCart));
      console.log('Pushed first Item: ', itemsInCart);
    }
    else {
      local_storage = JSON.parse(localStorage.getItem('cart'));
      console.log("LOCAL STORAGE HAS ITEMS", JSON.parse(localStorage.getItem('cart')));
      for (var i in local_storage) {
        console.log(local_storage[i].product.id);
        if (this.items.product.id == local_storage[i].product.id) {
          local_storage[i].quantity += 1;
          console.log("Quantity for " + i + " : " + local_storage[i].quantity);
          console.log('same product! index is ', i);
          this.items = null;
          break;
        }
      }
      if (this.items) {
        itemsInCart.push(this.items);
      }
      local_storage.forEach(function (item) {
        itemsInCart.push(item);
      })
      localStorage.setItem('cart', JSON.stringify(itemsInCart));

    }
  }
  getItems() {
  console.log("Cart: ", JSON.parse(localStorage.getItem('cart')));
  return this.items = JSON.parse(localStorage.getItem('cart'));
  }
  deleteItem(item) {
    item = item;
    console.log("Deleting : ", item);
    let shopping_cart;
    let index;
    shopping_cart = JSON.parse(localStorage.getItem('cart'));
    for (let i in shopping_cart) {
      if (item.product.name == shopping_cart[i].product.name) {
        index = i;
        console.log(index);
      }
    }
    shopping_cart.splice(index, 1);
    console.log("shopping_cart ", shopping_cart);
    localStorage.setItem('cart', JSON.stringify(shopping_cart));
  }

  addQty(item: Item) {
    item = item;
    let shopping_cart;
    shopping_cart = JSON.parse(localStorage.getItem('cart'));
    for (let i in shopping_cart) {
      if (item.product.name == shopping_cart[i].product.name) {
        shopping_cart[i].quantity += 1;
        //item = null;
        break;
      }
    }
    localStorage.setItem('cart', JSON.stringify(shopping_cart));
    let item_qty: any = parseInt(document.getElementById(`qty-item` + item.product.id).innerHTML);
    item_qty += 1;
    document.getElementById(`qty-item` + item.product.id).innerHTML = item_qty;
    if(document.getElementById(`qty-item` + item.product.id).innerHTML === '0')
    {
      localStorage.setItem('cart', JSON.stringify(item));
      document.getElementById(`qty-item` + item.product.id).innerHTML = "1";
    }
  }

  subQty(item: Item) {
    item = item;
    let index: any;
    let shopping_cart;
    shopping_cart = JSON.parse(localStorage.getItem('cart'));
    for (let i in shopping_cart) {
      if (item.product.name == shopping_cart[i].product.name && shopping_cart[i].quantity > 0) {
        shopping_cart[i].quantity -= 1;
        index = i;
        //item = null;
        break;
      }
      else {
        console.log("Do nothing");
      }
    }
    console.log(shopping_cart[index].quantity);
    if (shopping_cart[index].quantity >= 0) {
      let item_qty: any = parseInt(document.getElementById(`qty-item` + item.product.id).innerHTML);
      item_qty -= 1;
      document.getElementById(`qty-item` + item.product.id).innerHTML = item_qty;
      localStorage.setItem('cart', JSON.stringify(shopping_cart));
    }
  }
  checkTotal()
  {
    let cart_items;
    let finalTotal:any = 0;
    let newTotal: any;
    cart_items = JSON.parse(localStorage.getItem('cart'));
    for(let i in cart_items){
      if(cart_items[i].quantity >= 1){
        newTotal = (cart_items[i].quantity * cart_items[i].product.price);
        console.log(`${cart_items[i].product.name} total is ${newTotal}`);
        finalTotal += newTotal;
      }
      else if(cart_items[i] <= 0){
        console.log(`${cart_items[i].product.name} quantity is 0 or less!`);
      }
    }
    finalTotal = finalTotal.toFixed(2);
    document.getElementById('total-price').innerHTML = finalTotal;
    localStorage.setItem('total', JSON.stringify(finalTotal));
    return finalTotal;
  }
  clearCart() {
    localStorage.clear();
  }
  productAddedMsg()
  {
    //Product Added Message!
    let cartQuery =  document.getElementById('cart-query');
    let response = "Product Added!";
    let div = document.createElement('div');
    div.id = 'response';
    div.innerHTML = response;
    cartQuery.appendChild(div);
    document.getElementById('cart-query').classList.add('cartQuery');
    setTimeout(() =>{
      let domItem = document.getElementById('response');
      document.getElementById('cart-query').classList.remove('cartQuery');
      domItem.parentNode.removeChild(domItem);
      },200);
  }
  productAddedFlash()
  {
    document.getElementById('prod-info').style.background="rgba(43, 199, 23, 0.568)";
    setTimeout(() =>{
      document.getElementById('prod-info').style.background="";
    }, 200);
  }
  updateImageUrl(item){
    item.product.image_url = "../../assets/images/placeholder.png";
  }

}
