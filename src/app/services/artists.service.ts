import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
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
  private readonly _apiUrl =
    environment.apiUrl || 'http://localhost:3000/artists';

  // Backup artists array fetched directly from JSON file
  private readonly _jsonArtists: Array<Artist> = artistsFromJson.artists;

  // variables to hold the selected artist data
  private _selectedArtistSource = new BehaviorSubject<any>(null);
  selectedArtist = this._selectedArtistSource.asObservable();

  /** constructor */
  constructor(private _http: HttpClient) {}

  /** Public Methods */

  // to get artists from JSON Server, in case of error, use backup directly retrieved from file (needed for Vercel deployment)
  getArtists(): Observable<Array<Artist>> {
    return this._http.get<Array<Artist>>(this._apiUrl).pipe(
      catchError((error) => {
        console.log(
          'Error fetching artists, fetching directly from JSON file:',
          error
        );
        return of(this._jsonArtists);
      })
    );
  }

  // mock endpoint to update song/album as favourite
  toggleAddToFavourites(objectToFav: Favouritable): Observable<Favouritable> {
    const url = `${this._apiUrl}/${objectToFav.id}`;
    const body = {
      id: objectToFav.id,
      favourite: objectToFav.favourite,
    };
    return this._http.put<Favouritable>(url, body).pipe(
      catchError((error) => {
        console.log('Error adding to favourites:', error);
        return of(error);
      })
    );
  }

  // set the data of the clicked card to the currently selected artist
  setSelectedArtistData(artist: Artist) {
    this._selectedArtistSource.next(artist);
  }
}
