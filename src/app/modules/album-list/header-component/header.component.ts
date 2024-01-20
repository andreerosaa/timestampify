import { Component, Input, Output } from '@angular/core';
import { Artist } from '../../../models/artist';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() artists: Array<Artist> | undefined;
  @Output() filteredArtists: Observable<string[]> | undefined;

  control = new FormControl('');

  ngOnInit() {
    this.filteredArtists = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    console.log('test');
    console.log(this.filteredArtists);
    console.log(this.artists);
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    if (this.artists) {
      let artistsNames: string[] = [];
      this.artists.forEach((artist) => {
        artistsNames.push(artist.name);
      });
      console.log(artistsNames);
      return artistsNames.filter((artistName) =>
        this._normalizeValue(artistName).includes(filterValue)
      );
    } else {
      return [];
    }
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
