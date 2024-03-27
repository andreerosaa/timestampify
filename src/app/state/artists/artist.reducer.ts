import { createReducer, on } from "@ngrx/store";
import { ArtistStatuses } from "../../models/artist-statuses";
import { Artist } from "../../models/artist";
import { addSong, loadArtists, loadArtistsFailure, loadArtistsSuccess, removeSong, selectAlbum, toggleFavouriteAlbum, toggleFavouriteSong } from "./artist.actions";
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

    // Handle toggling favourite album
    on(toggleFavouriteAlbum, (state, { objectToFav }) => {
      let albumIndex: number = -1;
      let artistIndex: number = -1;
    
      // Find album
      state.artists.forEach((artistIt, loopIndex) => {
        const i = artistIt.albums.findIndex((album) => album.id === objectToFav.id);
        if (i !== -1) {
          albumIndex = i;
          artistIndex = loopIndex;
        }
      });
    
      // If album not found, return the current state
      if (albumIndex === -1) {
        return state;
      }
    
      // Update album
      const updatedAlbum: Album = {
        ...state.artists[artistIndex].albums[albumIndex],
        favourite: !objectToFav.favourite,
      };
    
      // Update state with the updated album
      const updatedArtists: Artist[] = [...state.artists];
      updatedArtists[artistIndex] = {
        ...state.artists[artistIndex],
        albums: state.artists[artistIndex].albums.map((album, index) =>
          index === albumIndex ? updatedAlbum : album
        ),
      };
    
      return { ...state, artists: updatedArtists, selectedAlbum: updatedAlbum };
    }),

    // Handle toggling favourite song
    on(toggleFavouriteSong, (state, { objectToFav }) => {
      let songIndex: number = -1;
      let albumIndex: number = -1;
      let artistIndex: number = -1;
    
      // Find album
      state.artists.forEach((artistIt, loopIndex) => {

        artistIt.albums.forEach(album => {
          const i = album.songs.findIndex((song) => song.id === objectToFav.id);

          if (i !== -1) {
            albumIndex = i;
            artistIndex = loopIndex;
          }
        })
        

      });
    
      // If album not found, return the current state
      if (albumIndex === -1) {
        return state;
      }
    
      // Update album
      const updatedAlbum: Album = {
        ...state.artists[artistIndex].albums[albumIndex],
        favourite: !objectToFav.favourite,
      };
    
      // Update state with the updated album
      const updatedArtists: Artist[] = [...state.artists];
      updatedArtists[artistIndex] = {
        ...state.artists[artistIndex],
        albums: state.artists[artistIndex].albums.map((album, index) =>
          index === albumIndex ? updatedAlbum : album
        ),
      };
    
      return { ...state, artists: updatedArtists, selectedAlbum: updatedAlbum };
    }),

    on(selectAlbum, (state, {album}) => ({...state, selectedAlbum: album}))
)