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
  isSearching: boolean = true;

  constructor(private artistsService: ArtistsService) {}

  ngOnInit(): void {
    this.isSearching = true;
    this.fetchArtists();
  }

  // Call artists service on component init to get all artists from json
  fetchArtists(): void {
    this.artistsService.getArtists().subscribe(
      (res: Array<Artist>) => {
        this.artists = res;
        console.log('Fetched artists:', this.artists);
        this.isSearching = false;
      },
      (error: any) => {
        console.log('Error fetching artists:', error);
      }
    );
  }
}
