import { Album } from './album';

export interface Artist {
  id: string;
  name: string;
  albums: Array<Album>;
}
