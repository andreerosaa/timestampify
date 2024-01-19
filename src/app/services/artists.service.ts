import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Artist } from '../../models/artist';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private apiUrl = environment.apiUrl || 'http://localhost:3000/artists';

  constructor(private http: HttpClient) {}

  getArtists(): Observable<Array<Artist>> {
    return this.http.get<Array<Artist>>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching artists:', error);
        return of([]);
      })
    );
  }
}
