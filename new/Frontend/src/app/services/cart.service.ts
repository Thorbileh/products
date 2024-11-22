import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', 
})
export class CartService {
  private cart: { [productId: string]: { product: any; quantity: number } } = {};

  // Add a product to the cart
  addToCart(product: any) {
    const productId = product.id;
    if (this.cart[productId]) {
      this.cart[productId].quantity += 1; 
    } else {
      this.cart[productId] = { product, quantity: 1 }; 
    }
   
  }

  // Increase the quantity of a product
  increaseQuantity(productId: string) {
    if (this.cart[productId]) {
      this.cart[productId].quantity += 1;
    } else {
      console.error('Product not in cart');
    }
  }

  // Decrease the quantity of a product (and remove if quantity becomes 0)
  decreaseQuantity(productId: string) {
    if (this.cart[productId]) {
      this.cart[productId].quantity -= 1;
      if (this.cart[productId].quantity <= 0) {
        delete this.cart[productId]; // Remove the product if quantity is 0
      }
    } else {
      console.error('Product not in cart');
    }
  }

  // Get the total quantity of items in the cart
  getTotalQuantity(): number {
    return Object.values(this.cart).reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  // Get the total price of items in the cart
  getTotalPrice(): number {
    return Object.values(this.cart).reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  // Get all items in the cart
  getCartItems() {
    return Object.values(this.cart);
  }
}

