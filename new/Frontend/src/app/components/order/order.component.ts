import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  order: any = {
    order_id: Date.now(), // Generate a unique order ID
    user_id: 15, // Replace with dynamic user ID
    order_date: new Date(), // Current date
    total_amount: 0,
    items: [],
  };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCartData();
  }

  loadCartData() {
    const cartItems = this.cartService.getCartItems(); // Assuming your CartService has this method
    if (cartItems.length) {
      this.order.items = cartItems.map((item: any) => ({
        prod_id: item.prod_id,
        prod_name: item.prod_name,
        quantity: item.quantity,
        price: item.price,
      }));

      this.order.total_amount = cartItems.reduce(
        (total: number, item: any) => total + item.price * item.quantity,
        0
      );
    }
  }

  
  async confirmOrder() {
    if (this.order.items.length === 0) {
      alert('Your cart is empty! Add items to place an order.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.order),
      });
  
      if (!response.ok) {
        throw new Error('Failed to place the order.');
      }
  
      alert('Order placed successfully! You can continue shopping with your current cart.');
    } catch (error) {
      alert('Error placing order. Please try again.');
      console.error(error);
    }
  }
}  