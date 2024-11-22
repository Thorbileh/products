import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

declare var bootstrap: any;  // Declare bootstrap if you're using it for initialization

@Component({
  selector: 'app-product-cards',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.css']
})
export class ProductCardsComponent implements OnInit, AfterViewInit {
  products: any[] = [];
  categories: any = {
    sides: [],
    drink: [],
    kota: [],
    combo: [],
    homeCooked: []
  };

  async ngOnInit() {
    try {
      const response = await fetch('http://localhost:3000/products'); 
      const data = await response.json();
      console.log('Fetched products:', data); 
      this.products = data;
      this.categorizeProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }


  ngAfterViewInit() {
    // Initialize the Bootstrap carousel manually
    const carouselElement = document.getElementById('comboDealsCarousel');
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 3000, // Auto-slide every 3 seconds
        ride: 'carousel', // Start the carousel automatically
      });
    }
  }

  categorizeProducts() {
    this.products.forEach((product) => {
      if (product.category_name.toLowerCase().includes('side')) {
        this.categories.sides.push(product);
      } else if (product.category_name.toLowerCase().includes('kota')) {
        this.categories.kota.push(product);
      } else if (product.category_name.toLowerCase().includes('combo')) {
        this.categories.combo.push(product);
      } else if (product.category_name.toLowerCase().includes('drink')) {
        this.categories.drink.push(product);
      } else {
        this.categories.homeCooked.push(product);
      }
    });
  }

  getCategories() {
    return Object.keys(this.categories);
  }
}
