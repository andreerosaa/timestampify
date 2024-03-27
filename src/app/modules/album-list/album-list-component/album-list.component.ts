import { Component } from '@angular/core';
import { Artist } from '../../../models/artist';
import { ArtistsService } from '../../../services/artists.service';
import { Store } from '@ngrx/store';
import { selectAllArtists } from '../../../state/artists/artist.selectors';
import { AppState } from '../../../state/app.state';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss',
})
export class AlbumListComponent {
  artists: Array<Artist> = [];
  isSearching: boolean = true;
  artists$: Observable<Artist[]>;
  addAlbumForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private _artistsService: ArtistsService,
    private addAlbumFormBuilder: FormBuilder
    ){
    this.artists$ = this.store.select(selectAllArtists);
    this.addAlbumForm = this.addAlbumFormBuilder.group({
      title:'',
      description:'',
      cover:'',
      artist:'',
      songTitle:['',[Validators.required]],
      length:['',[Validators.required]]
    })
    }
  
  ngOnInit(): void {
    this.isSearching = true;
    this.setArtists();
  }

  // Call artists service on component init to get all artists from json
  private setArtists(): void {
    this.artists$.subscribe(
      (res: Array<Artist>) => {
        this.artists = res;
        console.log('Fetched artists:', this.artists);
        if(res.length > 0){
          this.isSearching = false;
        }
      },
      (error: any) => {
        console.log('Error fetching artists:', error);
        this.isSearching = false;
      }
    )
  }

  addAlbum(): void{
  }
}