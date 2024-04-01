import { createAction, props } from "@ngrx/store";
import { Artist } from "../../models/artist";
import { Song } from "../../models/song";
import { Album } from "../../models/album";

export const loadArtists = createAction('[Artist List] Load Artists');

export const loadArtistsSuccess = createAction(
    '[Album List] Load Artists Success',
    props<{artists: Array<Artist>}>()
);

export const loadArtistsFailure = createAction(
    '[Album List] Load Artists Failure',
    props<{error: String}>()
);

export const addAlbum = createAction(
    '[Album List] Add Album',
    props<{ newArtist: Artist }>()
);

export const addSong = createAction(
    '[Album Details] Add Song',
    props<{ artistId: string; albumId: string; songToAdd: Song }>()
);

export const removeSong = createAction(
    '[Album Details] Remove Song',
    props<{ artistId: string; albumId: string; songId: string }>()
);

export const toggleFavouriteAlbum = createAction(
    '[Favourite Icon] Toggle Favourite Album',
    props<{ objectToFav: Album }>()
);

export const toggleFavouriteSong = createAction(
    '[Favourite Icon] Toggle Favourite Song',
    props<{ objectToFav: Song }>()
);

export const selectAlbum = createAction(
    '[Album Details] Select Album',
    props<{ album: Album}>()
);