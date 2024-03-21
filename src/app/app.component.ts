import { Component } from '@angular/core';
import { loadArtists } from './state/artists/artist.actions';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'timestampify';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadArtists());
    console.log('load artists dispatched')
  }
}
