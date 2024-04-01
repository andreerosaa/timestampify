import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() sendId: EventEmitter<string> = new EventEmitter<string>();

  sendSongId() {
    if (this.song) {
      this.sendId.emit(this.song.id);
    }
  }
}
