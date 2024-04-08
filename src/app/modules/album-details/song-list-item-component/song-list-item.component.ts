import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Artist } from '../../../models/artist';
import { Song } from '../../../models/song';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { editSong } from '../../../state/artists/artist.actions';
import { Album } from '../../../models/album';

@Component({
  selector: 'app-song-list-item',
  templateUrl: './song-list-item.component.html',
  styleUrl: './song-list-item.component.scss',
})
export class SongListItemComponent {
  @Input() song: Song | undefined;
  @Input() artist: Artist | undefined;
  @Input() album: Album | undefined;
  @Output() sendId: EventEmitter<string> = new EventEmitter<string>();

  editSongForm: FormGroup;

  editing: boolean = false;

  constructor(
    private editSongFormBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.editSongForm = this.editSongFormBuilder.group({
      title: ['', [Validators.required]],
      length: ['', [Validators.required]],
    });
  }

  sendSongId() {
    if (this.song) {
      this.sendId.emit(this.song.id);
    }
  }

  toggleEditSong() {
    this.editing = !this.editing;
    this.editSongForm.reset();
  }

  editSong() {
    if (this.editSongForm.valid && this.artist && this.album && this.song) {
      let editedLength = this.editSongForm.get('length')?.value;

      if (editedLength[0] === '0') {
        editedLength = editedLength.substring(1);
      }

      let editedSong: Song = {
        id: this.song.id,
        favourite: this.song.favourite,
        title: this.editSongForm.get('title')?.value,
        length: editedLength,
      };

      this.store.dispatch(
        editSong({
          artistId: this.artist?.id,
          albumId: this.album?.id,
          newSong: editedSong,
        })
      );

      this.editSongForm.reset();
      this.editing = false;
    } else {
      console.log('Invalid form');
    }
  }
}
