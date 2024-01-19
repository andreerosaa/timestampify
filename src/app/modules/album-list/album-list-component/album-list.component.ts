import { Component } from '@angular/core';
import { Artist } from '../../../models/artist';
import { ArtistsService } from '../../../services/artists.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss',
})
export class AlbumListComponent {
  artists: Array<Artist> = [];

  constructor(private artistsService: ArtistsService) {}

  ngOnInit(): void {
    this.fetchArtists();
  }

  fetchArtists(): void {
    this.artistsService.getArtists().subscribe(
      (res: Array<Artist>) => {
        this.artists = res;
        console.log('Fetched artists:', this.artists);
      },
      (error: any) => {
        console.error('Error fetching artists:', error);
      }
    );
  }
}
