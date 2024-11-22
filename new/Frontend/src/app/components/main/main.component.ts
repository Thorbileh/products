import { Component } from '@angular/core';
import { LeftbarComponent } from '../leftbar/leftbar.component';
import { ProductCardsComponent } from '../product-cards/product-cards.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LeftbarComponent,ProductCardsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
