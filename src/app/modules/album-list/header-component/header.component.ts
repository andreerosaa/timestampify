import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() slideToggleChange = new EventEmitter<boolean>();

  toggle = new FormControl('', []);

  ngOnInit(): void {}

  onToggleChange(event: any) {
    this.slideToggleChange.emit(event.checked);
  }
}
