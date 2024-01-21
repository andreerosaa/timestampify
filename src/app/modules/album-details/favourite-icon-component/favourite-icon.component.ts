import { Component, Input } from '@angular/core';
import { Favouritable } from '../../../models/favouritable';
import { Artist } from '../../../models/artist';
import { ArtistsService } from '../../../services/artists.service';

@Component({
  selector: 'app-favourite-icon',
  templateUrl: './favourite-icon.component.html',
  styleUrl: './favourite-icon.component.scss',
})
export class FavouriteIconComponent {
  @Input() isFavourite: Favouritable = { favourite: false, id: '' };
  @Input() artist: Artist | undefined;

  constructor(private artistsService: ArtistsService) {}

  addOrRemoveFromFavourites() {
    this.artistsService.toggleAddToFavourites(this.isFavourite).subscribe(
      (res: Favouritable) => {
        console.log('Added to favourites:', res);
        this.isFavourite.favourite = !this.isFavourite.favourite;
      },
      (error: any) => {
        console.error('Error adding to favourites:', error);
      }
    );
  }
}
