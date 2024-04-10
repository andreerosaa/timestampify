import { Component, Input } from '@angular/core';
import { Album } from '../../../models/album';
import { Artist } from '../../../models/artist';
import { ArtistsService } from '../../../services/artists.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { selectAlbum } from '../../../state/artists/artist.actions';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss',
})
export class AlbumCardComponent {
  @Input() album: Album | undefined;
  @Input() artist: Artist | undefined;

  constructor(
    private _artistsService: ArtistsService,
    private store: Store<AppState>
  ) {}

  // on click send the artist data to the service to set the selected artist
  selectArtistData(artist: any, album: Album) {
    this.store.dispatch(selectAlbum({ album }));

    this._artistsService.setSelectedArtistData(artist);
  }
}
