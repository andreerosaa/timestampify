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

  //Logic to change icon on click and send request to service to update item as favourite
  addOrRemoveFromFavourites() {
    this.isFavourite.favourite = !this.isFavourite.favourite;
    this.artistsService.toggleAddToFavourites(this.isFavourite).subscribe(
      (res: Favouritable) => {
        console.log('Added to favourites:', res);
      },
      (error: any) => {
        this.isFavourite.favourite = !this.isFavourite.favourite;
        console.log('Error adding to favourites:', error);
      }
    );
  }
}
