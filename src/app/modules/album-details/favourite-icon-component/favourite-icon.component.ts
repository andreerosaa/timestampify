import { Component, Input } from '@angular/core';
import { Favouritable } from '../../../models/favouritable';
import { Artist } from '../../../models/artist';
import { ArtistsService } from '../../../services/artists.service';
import { Album } from '../../../models/album';
import { Song } from '../../../models/song';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { toggleFavourite } from '../../../state/artists/artist.actions';

@Component({
  selector: 'app-favourite-icon',
  templateUrl: './favourite-icon.component.html',
  styleUrl: './favourite-icon.component.scss',
})
export class FavouriteIconComponent {
  @Input() isFavourite: Favouritable = { favourite: false, id: '' };
  @Input() artist: Artist | undefined;

  constructor(
    private _artistsService: ArtistsService,
    private store: Store<AppState>,
    ) {}

  //Logic to change icon on click and send request to service to update item as favourite
  addOrRemoveFromFavourites() {
    this.store.dispatch(toggleFavourite({objectToFav: this.isFavourite}));

    // this.isFavourite.favourite = !this.isFavourite.favourite;
    // // Store favourite
    // localStorage.setItem('artist', JSON.stringify(this.artist));
    // this._artistsService.toggleAddToFavourites(this.isFavourite).subscribe(
    //   (res: Favouritable) => {
    //     console.log('Added to favourites:', res);
    //   },
    //   (error: any) => {
    //     this.isFavourite.favourite = !this.isFavourite.favourite;
    //     console.log('Error adding to favourites:', error);
    //   }
    // );
  }
}
