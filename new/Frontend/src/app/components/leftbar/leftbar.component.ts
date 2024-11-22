import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leftbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './leftbar.component.html',
  styleUrls: ['./leftbar.component.css'],
})
export class LeftbarComponent {
  @Input() categories: string[] = []; // Get categories from parent
  @Output() onSelectCategory = new EventEmitter<string>(); // Emit category selection

  selectCategory(category: string) {
    this.onSelectCategory.emit(category); // Emit the selected category
  }
}
