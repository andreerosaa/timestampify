import { Component, Input } from '@angular/core';
import { Favouritable } from '../../../models/favouritable';
import { Artist } from '../../../models/artist';
import { ArtistsService } from '../../../services/artists.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { toggleFavouriteAlbum } from '../../../state/artists/artist.actions';
import { toggleFavouriteSong} from '../../../state/artists/artist.actions';
import { Album } from '../../../models/album';
import { Song } from '../../../models/song';

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
    if(this.isAlbum(this.isFavourite)){
      this.store.dispatch(toggleFavouriteAlbum({objectToFav: this.isFavourite as Album}));
    } else if(this.isSong(this.isFavourite)) {
      this.store.dispatch(toggleFavouriteSong({objectToFav: this.isFavourite as Song}));
    }

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


  isAlbum(objToFav: any): objToFav is Album {
    return (objToFav as Album).songs !== undefined;
  }
  
  isSong(objToFav: any): objToFav is Song {
    return (objToFav as Song).length !== undefined;
  }
}
