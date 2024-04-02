import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Artist } from '../../../models/artist';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { Observable } from 'rxjs';
import { selectFavouriteAlbums } from '../../../state/artists/artist.selectors';

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
