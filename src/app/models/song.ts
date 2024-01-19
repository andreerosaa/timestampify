import { Favouritable } from './favouritable';

export interface Song extends Favouritable {
  id: string;
  title: string;
  length: string;
}
