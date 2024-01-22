import { Component, Input } from '@angular/core';
import { Artist } from '../../../models/artist';
import { Song } from '../../../models/song';

@Component({
  selector: 'app-song-list-item',
  templateUrl: './song-list-item.component.html',
  styleUrl: './song-list-item.component.scss',
})
export class SongListItemComponent {
  @Input() song: Song | undefined;
  @Input() artist: Artist | undefined;
}
