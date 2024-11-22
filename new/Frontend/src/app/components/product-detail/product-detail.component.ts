import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductCardsComponent } from '../product-cards/product-cards.component';

import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, ProductCardsComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: any;
  quantity: number = 1; // Default quantity
  confirmationMessage: string = ''; // Message to show after adding to cart

  constructor(private route: ActivatedRoute, private cartService: CartService) {}

  async ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('prod_id');
    if (productId) {
      try {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        this.product = await response.json();
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    }
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  get totalPrice(): number {
    return this.product?.price ? this.product.price * this.quantity : 0;
  }
 
  async addToCart() {
    if (this.product) {
      const cartItem = {
        user_id: 2,
        prod_id: this.product.prod_id, 
        price: this.product.price,
        quantity: this.quantity,
      };
  
      try {
        const response = await fetch('http://localhost:3000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        });

        if (response.status === 401) {
          // User not registered
          alert('You must register first before adding products to your cart.');
          return;
        }
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Backend Error:', errorData);
          throw new Error('Failed to add product to cart');
        }
  
        await response.json();
        alert(`You have successfully added ${this.product.prod_name} to your cart!`);
      } catch (error) {
        alert('Error adding product to cart. Please try again.');
      }
    }
  }
}  