import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Artist } from '../models/artist';
import { environment } from '../../environments/environment.development';
import { Favouritable } from '../models/favouritable';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private apiUrl = environment.apiUrl || 'http://localhost:3000/artists';
  private jsonPath = environment.jsonPath || '../data/artists_albums';

  constructor(private http: HttpClient) {}

  getArtists(): Observable<Array<Artist>> {
    return this.http.get<Array<Artist>>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching artists:', error);
        return this.fetchFromLocalJson();
      })
    );
  }

  toggleAddToFavourites(objectToFav: Favouritable): Observable<Favouritable> {
    const url = `${this.apiUrl}/${objectToFav.id}`;
    const body = {
      id: objectToFav.id,
      favourite: objectToFav.favourite,
    };
    return this.http.put<Favouritable>(url, body).pipe(
      catchError((error) => {
        console.error('Error adding to favourites:', error);
        return of(error);
      })
    );
  }

  private fetchFromLocalJson(): Observable<Array<Artist>> {
    return this.http.get<Array<Artist>>(this.jsonPath).pipe(
      catchError((jsonPathError) => {
        console.error(
          'Error fetching artists from local JSON file:',
          jsonPathError
        );
        console.log('Returning an empty array.');
        return of([]);
      })
    );
  }
}
