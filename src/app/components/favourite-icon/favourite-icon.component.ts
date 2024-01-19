import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favourite-icon',
  templateUrl: './favourite-icon.component.html',
  styleUrl: './favourite-icon.component.scss',
})
export class FavouriteIconComponent {
  @Input() isFavourite: boolean = false;

  @Output() toggle = new EventEmitter<void>();

  toggleFavorite() {
    console.log('test');
    this.toggle.emit();
  }
}
