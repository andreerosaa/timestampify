import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { selectedIsFilteredByFavourites } from '../../../state/artists/artist.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { Observable } from 'rxjs';
import { filterFavs } from '../../../state/artists/artist.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  filterFav$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.filterFav$ = this.store.select(selectedIsFilteredByFavourites);
  }

  ngOnInit(): void {}

  onToggleChange(event: any) {
    this.store.dispatch(filterFavs({ filterByFavourites: event.checked }));
  }
}
