import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Artist } from '../models/artist';
import { environment } from '../../environments/environment.development';
import { Favouritable } from '../models/favouritable';
import artistsFromJson from '../data/artists_albums.json';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  /** Private Properties */

  // JSON Server API url from the environment variable
  private readonly apiUrl =
    environment.apiUrl || 'http://localhost:3000/artists';

  // Backup artists array fetched directly from JSON file
  private readonly jsonArtists: Array<Artist> = artistsFromJson.artists;

  /** constructor */
  constructor(private http: HttpClient) {}

  /** Public Methods */

  // to get artists from JSON Server, in case of error, use backup directly retrieved from file (needed for Vercel deployment)
  getArtists(): Observable<Array<Artist>> {
    return this.http.get<Array<Artist>>(this.apiUrl).pipe(
      catchError((error) => {
        console.log(
          'Error fetching artists, fetching directly from JSON file:',
          error
        );
        return of(this.jsonArtists);
      })
    );
  }

  // mock endpoint to update song/album as favourite
  toggleAddToFavourites(objectToFav: Favouritable): Observable<Favouritable> {
    const url = `${this.apiUrl}/${objectToFav.id}`;
    const body = {
      id: objectToFav.id,
      favourite: objectToFav.favourite,
    };
    return this.http.put<Favouritable>(url, body).pipe(
      catchError((error) => {
        console.log('Error adding to favourites:', error);
        return of(error);
      })
    );
  }
}
