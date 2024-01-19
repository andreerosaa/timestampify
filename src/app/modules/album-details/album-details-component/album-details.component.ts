import { Component } from '@angular/core';
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
  duration: Duration = { minutes: 0, seconds: 0 };

  constructor(
    private artistsService: ArtistsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get the albumId from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.albumId = params.get('albumId') || '';
    });

    // Fetch the artist data
    this.artistsService.getArtists().subscribe((artists) => {
      // Find the artist that contains the requested album
      this.artist = artists.find((a) =>
        a.albums.some((album) => {
          if (album.id === this.albumId) {
            this.getDuration(album);
            return true;
          }
          return false;
        })
      );
    });
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
