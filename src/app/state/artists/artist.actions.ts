import { createAction, props } from "@ngrx/store";
import { Artist } from "../../models/artist";
import { Song } from "../../models/song";
import { Album } from "../../models/album";
import { Favouritable } from "../../models/favouritable";

export const loadArtists = createAction('[Artist List] Load Artists');

export const loadArtistsSuccess = createAction(
    '[Album List] Load Artists Success',
    props<{artists: Array<Artist>}>()
);

export const loadArtistsFailure = createAction(
    '[Album List] Load Artists Failure',
    props<{error: String}>()
);

export const addSong = createAction(
    '[Album Details] Add Song',
    props<{ artistId: string; albumId: string; songToAdd: Song }>()
);

export const removeSong = createAction(
    '[Album Details] Remove Song',
    props<{ artistId: string; albumId: string; songId: string }>()
);

export const toggleFavourite = createAction(
    '[Favourite Icon] Toggle Favourite',
    props<{ objectToFav: Favouritable }>()
);

export const selectAlbum = createAction(
    '[Album Details] Select Album',
    props<{ album: Album}>()
);