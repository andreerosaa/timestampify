import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectArtists = (state: AppState) => state.artistsState;

export const selectAllArtists = createSelector(
    selectArtists,
    state => state.artists
);

export const selectedAlbum = createSelector(
    selectArtists,
    state => state.selectedAlbum
);