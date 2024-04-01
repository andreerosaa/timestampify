import { Component, HostListener } from '@angular/core';
import { ArtistsService } from '../../../services/artists.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Artist } from '../../../models/artist';
import { Album } from '../../../models/album';
import { Duration } from '../../../models/duration';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { addSong, removeSong, selectAlbum } from '../../../state/artists/artist.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { selectedAlbum } from '../../../state/artists/artist.selectors';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrl: './album-details.component.scss',
})
export class AlbumDetailsComponent {

  artist: Artist | undefined;

  albumId: string = '';
  album: Album | undefined;
  album$: Observable<Album | null>;

  duration: Duration = { minutes: 0, seconds: 0 };

  isSearching: boolean = true;

  addSongForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private _artistsService: ArtistsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private addSongFormBuilder: FormBuilder
  ) {
    this.addSongForm = this.addSongFormBuilder.group({
      title:['',[Validators.required]],
      length:['',[Validators.required]]
    })

    this.album$ = this.store.select(selectedAlbum);
  }

  ngOnInit() {
    // subscribe to the currently selected album
    this.album$.subscribe(album => {
      if(album) {
        this.isSearching = false;
        this.getDuration(album);
      }
      else {
        this._router.navigate(['not-found']);
      }
    })
    // // Get the albumId from the route parameters
    // this.albumId = this._route.snapshot.paramMap.get('albumId') || '';

    // Fetch the artist data from the selected on click
    this._artistsService.selectedArtist.subscribe((selectedArtistInput) => {
      // Find the artist that contains the requested album
      this.artist = selectedArtistInput;
    })

    //   // In case the artist data is not found, fetch from local storage
    //   if (!this.artist) {
    //     let localStorageArtist = localStorage.getItem('artist');
    //     if (localStorageArtist) {
    //       this.artist = JSON.parse(localStorageArtist);
    //     }
    //   }
    // });

    // this.artist?.albums.forEach((album) => {
    //   if (album.id === this.albumId) {
    //     this.getDuration(album);
    //     this.album = album;
    //     this.isSearching = false;

    //     // Store successfully found artists data on local storage
    //     localStorage.setItem('artist', JSON.stringify(this.artist));
    //     return true;
    //   } else {
    //     this.isSearching = false;
    //     return;
    //   }
    // });

    // this.album$.subscribe(album => {
    //   if(album)
    //   this.album = album;
    //   this.isSearching = false
    // })
  }

  getDuration(album: Album): Duration {
    let durationInSeconds = 0;
    album.songs.forEach((song) => {
      let songLength = this.parseSongLength(song.length);
      let songLengthInSeconds = 0;
      if (songLength) {
        songLengthInSeconds = this.parseToSeconds(songLength);
      }

      return (durationInSeconds += songLengthInSeconds);
    });
    this.duration = this.parseToDuration(durationInSeconds);

    return this.duration;
  }

  parseSongLength(length: string): Duration | null {
    const lengthFormat = /^(\d{1,2}):(\d{1,2})$/;
    const isMatch = length.match(lengthFormat);

    if (isMatch) {
      const minutes = parseInt(isMatch[1], 10);
      const seconds = parseInt(isMatch[2], 10);

      return { minutes, seconds };
    }

    return null;
  }

  parseToSeconds(timeToConvert: Duration): number {
    let minutesToSeconds = 0;
    if (timeToConvert.minutes > 0) {
      minutesToSeconds = timeToConvert.minutes * 60;
    }
    return minutesToSeconds + timeToConvert.seconds;
  }

  parseToDuration(secondsToConvert: number): Duration {
    let convertedDuration: Duration = { minutes: 0, seconds: 0 };
    if (secondsToConvert < 60) {
      convertedDuration.seconds = secondsToConvert;
    } else {
      convertedDuration.minutes = Math.floor(secondsToConvert / 60);
      convertedDuration.seconds = secondsToConvert % 60;
    }

    return convertedDuration;
  }

  addSong(albumId:string): void{
    const songToAdd = this.addSongForm.value;

    if(this.artist && this.addSongForm.valid){
      songToAdd.favourite = false;
      songToAdd.id = this.artist?.id + albumId + songToAdd.title.toLowerCase().trim();
      const artistId = this.artist?.id;
      this.store.dispatch(addSong({ artistId, albumId, songToAdd }));
      this.addSongForm.reset();
    }
  }

  removeSong(songId:string, albumId: string): void{
    if(this.artist){
      const artistId = this.artist?.id;
      this.store.dispatch(removeSong({ artistId, albumId, songId }));
    }
  }
}
