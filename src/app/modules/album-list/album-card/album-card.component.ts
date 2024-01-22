import { Component, Input } from '@angular/core';
import { Album } from '../../../models/album';
import { Artist } from '../../../models/artist';
import { ArtistsService } from '../../../services/artists.service';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss',
})
export class AlbumCardComponent {
  @Input() album: Album | undefined;
  @Input() artist: Artist | undefined;

  constructor(private _artistsService: ArtistsService) {}

  selectArtistData(artist: any) {
    this._artistsService.setSelectedArtistData(artist);
  }
}
