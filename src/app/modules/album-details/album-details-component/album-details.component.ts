import { Component, HostListener } from '@angular/core';
import { ArtistsService } from '../../../services/artists.service';
import { ActivatedRoute } from '@angular/router';
import { Artist } from '../../../models/artist';
import { Album } from '../../../models/album';
import { Duration } from '../../../models/duration';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrl: './album-details.component.scss',
})
export class AlbumDetailsComponent {
  artist: Artist | undefined;
  albumId: string = '';
  album: Album | undefined;
  duration: Duration = { minutes: 0, seconds: 0 };
  isSearching: boolean = true;

  constructor(
    private _artistsService: ArtistsService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get the albumId from the route parameters
    this._route.paramMap.subscribe((params) => {
      this.albumId = params.get('albumId') || '';
    });

    // Fetch the artist data from the selected on click
    this._artistsService.selectedArtist.subscribe((selectedArtistInput) => {
      // Find the artist that contains the requested album
      this.artist = selectedArtistInput;

      // In case the artist data is not found, fetch from local storage
      if (!this.artist) {
        let localStorageArtist = localStorage.getItem('artist');
        if (localStorageArtist) {
          this.artist = JSON.parse(localStorageArtist);
        }
      }

      this.artist?.albums.forEach((album) => {
        if (album.id === this.albumId) {
          this.getDuration(album);
          this.album = album;
          this.isSearching = false;
          return true;
        }
        return false;
      });
    });
  }

  ngOnDestroy(): void {
    // Store artist data on local storage
    localStorage.setItem('artist', JSON.stringify(this.artist));
  }

  // On refresh trigger ngOnDestroy
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    this.ngOnDestroy();
  }

  getDuration(album: Album): Duration {
    let durationInSeconds = this.parseToSeconds(this.duration);
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
}
