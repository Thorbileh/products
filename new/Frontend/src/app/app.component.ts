import { Component, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LeftbarComponent } from "./components/leftbar/leftbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductCardsComponent } from "./components/product-cards/product-cards.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    NavbarComponent,
    LeftbarComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    ProductCardsComponent,
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('productCards') productCards!: ProductCardsComponent; 

  title = 'LocalBites';
  showSidebar = true;
  showProducts = true;

  getCategories(): string[] {
    return this.productCards ? this.productCards.getCategories() : [];
  }

  // selectCategory(category: string) {
  //   if (this.productCards) {
  //     this.productCards.scrollToCategory(category); // Call scrollToCategory
  //   }
  // }


  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const hiddenRoutes = ['/login', '/register', '/cart', '/details','/checkout'];
        this.showSidebar = !hiddenRoutes.includes(event.url);
        this.showProducts = !hiddenRoutes.includes(event.url);
      });
    }
}
