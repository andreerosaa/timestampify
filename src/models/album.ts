import { Song } from './song';

export interface Album {
  id: string;
  title: string;
  songs: Array<Song>;
  description: string;
  coverArt: string;
  favourite: boolean;
}
