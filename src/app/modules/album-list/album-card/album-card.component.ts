import { Component, Input } from '@angular/core';
import { Album } from '../../../models/album';
import { Artist } from '../../../models/artist';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss',
})
export class AlbumCardComponent {
  @Input() album: Album | undefined;
  @Input() artist: Artist | undefined;
}
