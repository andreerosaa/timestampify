import { Component, Input, Output } from '@angular/core';
import { Artist } from '../../../models/artist';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() artists: Array<Artist> | undefined;
}
