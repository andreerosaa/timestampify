import { Favouritable } from './favouritable';
import { Song } from './song';

export interface Album extends Favouritable {
  id: string;
  title: string;
  songs: Array<Song>;
  description: string;
  coverArt: string;
}
