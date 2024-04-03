import { Component } from '@angular/core';
import { Artist } from '../../../models/artist';
import { ArtistsService } from '../../../services/artists.service';
import { Store } from '@ngrx/store';
import {
  selectAllArtists,
  selectFavouriteAlbums,
} from '../../../state/artists/artist.selectors';
import { AppState } from '../../../state/app.state';
import { Observable } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addAlbum } from '../../../state/artists/artist.actions';
import { Album } from '../../../models/album';
import { Song } from '../../../models/song';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss',
})
export class AlbumListComponent {
  artists: Array<Artist> = [];
  isSearching: boolean = true;
  artists$: Observable<Artist[]>;
  artistsFav$: Observable<Artist[]>;
  addAlbumForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private addAlbumFormBuilder: FormBuilder
  ) {
    this.artistsFav$ = this.store.select(selectFavouriteAlbums);
    this.artists$ = this.store.select(selectAllArtists);
    this.addAlbumForm = this.addAlbumFormBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      cover: ['', [Validators.required]],
      artist: ['', [Validators.required]],
      songs: this.addAlbumFormBuilder.array([this.songArrayForm()]),
    });
  }

  ngOnInit(): void {
    this.isSearching = true;
    this.setArtists();
  }

  // Call artists service on component init to get all artists from json
  private setArtists(): void {
    this.artists$.subscribe(
      (res: Array<Artist>) => {
        this.artists = res;
        console.log('Fetched artists:', this.artists);
        if (res.length > 0) {
          this.isSearching = false;
        }
      },
      (error: any) => {
        console.log('Error fetching artists:', error);
        this.isSearching = false;
      }
    );
  }

  addAlbum(): void {
    if (this.addAlbumForm.valid) {
      let albumToAdd: Artist = {
        name: this.addAlbumForm.get('artist')?.value,
        id: '',
        albums: [],
      };

      albumToAdd.id = albumToAdd.name.toLowerCase().trim().split(' ').join('');

      let newAlbum: Album = {
        description: this.addAlbumForm.get('description')?.value,
        coverArt: this.addAlbumForm.get('cover')?.value,
        title: this.addAlbumForm.get('title')?.value,
        favourite: false,
        id: '',
        songs: this.addAlbumForm.get('songs')?.value.map((song: any) => {
          return {
            title: song.songTitle,
            length: song.length,
            favourite: false,
            id: song.songTitle.toLowerCase().trim().split(' ').join(''),
          };
        }),
      };

      newAlbum.id = newAlbum.title.toLowerCase().trim().split(' ').join('');

      albumToAdd.albums.push(newAlbum);

      console.log(albumToAdd);

      this.store.dispatch(addAlbum({ newArtist: albumToAdd }));

      this.addAlbumForm.reset();
    } else {
      console.log('Invalid form');
    }
  }

  get songs() {
    return this.addAlbumForm.get('songs') as FormArray;
  }

  songArrayForm() {
    return this.addAlbumFormBuilder.group({
      songTitle: ['', Validators.required],
      length: ['', Validators.required],
    });
  }

  addSong() {
    this.songs.push(this.songArrayForm());
  }

  removeSong(index: number) {
    this.songs.removeAt(index);
  }

  onSlideToggleChange(event: boolean) {
    if (event) {
      this.artistsFav$.subscribe((res) => {
        this.artists = res;
      });
    } else {
      this.setArtists();
    }
  }
}
