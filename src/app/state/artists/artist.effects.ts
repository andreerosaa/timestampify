import { ArtistsService } from "../../services/artists.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadArtists, loadArtistsFailure, loadArtistsSuccess } from "./artist.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ArtistEffects{
   constructor(
    private actions$: Actions,
    private artistsService: ArtistsService
   ){}

   loadArtists$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadArtists),
            switchMap(() =>
                this.artistsService.getArtists().pipe(
                    map((artists) => loadArtistsSuccess({artists: artists})),
                    catchError((error) => of(loadArtistsFailure({error})))
                )
            )
        )
   )
}