import { createReducer, on } from "@ngrx/store";
import { ArtistStatuses } from "../../models/artist-statuses";
import { Artist } from "../../models/artist";
import { addSong, loadArtists, loadArtistsFailure, loadArtistsSuccess, removeSong, selectAlbum, toggleFavourite } from "./artist.actions";
import { Album } from "../../models/album";

export interface ArtistState{
    artists: Array<Artist>;
    selectedAlbum: Album | null;
    error: String | null;
    status: ArtistStatuses;
}

export const initialState: ArtistState = {
    artists: [],
    selectedAlbum: null,
    error: null,
    status: ArtistStatuses.pending
}

export const artistReducer = createReducer(
    // Supply the initial state
    initialState,

    // Trigger loading the artists
    on(loadArtists, (state) => ({...state, status: ArtistStatuses.loading})),

    // Handle successfully loaded artists
    on(loadArtistsSuccess, (state, {artists}) => ({
        ...state,
        artists: artists,
        selectedAlbum: null,
        error: null,
        status: ArtistStatuses.success
    })),

    // Handle failure loading artists
    on(loadArtistsFailure, (state, {error}) => ({
        ...state,
        selectedAlbum: null,
        error: error,
        status: ArtistStatuses.error
    })),

    // Handle adding new songs to albums
    on(addSong, (state , {artistId, albumId, songToAdd}) => {
        // Find artist
        const artistIndex = state.artists.findIndex((artist) => artist.id === artistId);
        if (artistIndex === -1) {
        return state;
        }

        // Find album
        const albumIndex = state.artists[artistIndex].albums.findIndex((album) => album.id === albumId);
        if (albumIndex === -1) {
        return state;
        }

        // Update album with added song
        const updatedAlbum: Album = {
            ...state.artists[artistIndex].albums[albumIndex],
            songs: [...state.artists[artistIndex].albums[albumIndex].songs, songToAdd],
        };

        // Update state with the updated album
        const updatedArtists = [...state.artists];
        updatedArtists[artistIndex] = {
            ...state.artists[artistIndex],
            albums: state.artists[artistIndex].albums.map((album, index) =>
                index === albumIndex ? updatedAlbum : album
            ),
        };

        return { ...state, artists: updatedArtists, selectedAlbum: updatedAlbum };
    }),

    // Handle removing song from albums
    on(removeSong, (state , {artistId, albumId, songId}) => {
        // Find artist
        const artistIndex = state.artists.findIndex((artist) => artist.id === artistId);
        if (artistIndex === -1) {
        return state;
        }

        // Find album
        const albumIndex = state.artists[artistIndex].albums.findIndex((album) => album.id === albumId);
        if (albumIndex === -1) {
        return state;
        }

        // Update album with added song
        const updatedAlbum: Album = {
            ...state.artists[artistIndex].albums[albumIndex],
            songs: [...state.artists[artistIndex].albums[albumIndex].songs.filter(song => song.id !== songId)],
        };

        // Update state with the updated album
        const updatedArtists = [...state.artists];
        updatedArtists[artistIndex] = {
            ...state.artists[artistIndex],
            albums: state.artists[artistIndex].albums.map((album, index) =>
                index === albumIndex ? updatedAlbum : album
            ),
        };

        return { ...state, artists: updatedArtists, selectedAlbum: updatedAlbum };
    }),

    // Handle toggling favourites
    on(toggleFavourite, (state) => {
        return { ...state};
    }),

    on(selectAlbum, (state, {album}) => ({...state, selectedAlbum: album}))
)