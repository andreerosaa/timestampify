import { createReducer, on } from '@ngrx/store';
import { ArtistStatuses } from '../../models/artist-statuses';
import { Artist } from '../../models/artist';
import {
  addAlbum,
  addSong,
  editSong,
  filterFavs,
  loadArtists,
  loadArtistsFailure,
  loadArtistsSuccess,
  removeSong,
  selectAlbum,
  toggleFavouriteAlbum,
  toggleFavouriteSong,
} from './artist.actions';
import { Album } from '../../models/album';
import { Song } from '../../models/song';
import { state } from '@angular/animations';

export interface ArtistState {
  artists: Array<Artist>;
  selectedAlbum: Album | null;
  filterByFavourites: boolean;
  error: String | null;
  status: ArtistStatuses;
}

export const initialState: ArtistState = {
  artists: [],
  selectedAlbum: null,
  filterByFavourites: false,
  error: null,
  status: ArtistStatuses.pending,
};

export const artistReducer = createReducer(
  initialState,

  // Handle toggling favourites filter
  on(filterFavs, (state, { filterByFavourites }) => ({
    ...state,
    filterByFavourites: filterByFavourites,
  })),

  // Trigger loading the artists
  on(loadArtists, (state) => ({ ...state, status: ArtistStatuses.loading })),

  // Handle successfully loaded artists
  on(loadArtistsSuccess, (state, { artists }) => ({
    ...state,
    artists: artists,
    selectedAlbum: null,
    error: null,
    status: ArtistStatuses.success,
  })),

  // Handle failure loading artists
  on(loadArtistsFailure, (state, { error }) => ({
    ...state,
    selectedAlbum: null,
    error: error,
    status: ArtistStatuses.error,
  })),

  // Handle adding new album
  on(addAlbum, (state, { newArtist }) => {
    // Update state with the new album
    const updatedArtists = [...state.artists];
    updatedArtists.push(newArtist);
    return { ...state, artists: updatedArtists };
  }),

  // Handle adding new songs to albums
  on(addSong, (state, { artistId, albumId, songToAdd }) => {
    // Find artist
    const artistIndex = state.artists.findIndex(
      (artist) => artist.id === artistId
    );
    if (artistIndex === -1) {
      return state;
    }

    // Find album
    const albumIndex = state.artists[artistIndex].albums.findIndex(
      (album) => album.id === albumId
    );
    if (albumIndex === -1) {
      return state;
    }

    // Update album with added song
    const updatedAlbum: Album = {
      ...state.artists[artistIndex].albums[albumIndex],
      songs: [
        ...state.artists[artistIndex].albums[albumIndex].songs,
        songToAdd,
      ],
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

  // Handle adding new songs to albums
  on(editSong, (state, { artistId, albumId, newSong }) => {
    // Find artist
    const artistIndex = state.artists.findIndex(
      (artist) => artist.id === artistId
    );
    if (artistIndex === -1) {
      return state;
    }

    // Find album
    const albumIndex = state.artists[artistIndex].albums.findIndex(
      (album) => album.id === albumId
    );
    if (albumIndex === -1) {
      return state;
    }

    // Find song
    const songIndex = state.artists[artistIndex].albums[
      albumIndex
    ].songs.findIndex((song) => song.id === newSong.id);
    if (songIndex === -1) {
      return state;
    }

    // Update album with edited song
    const updatedAlbum: Album = {
      ...state.artists[artistIndex].albums[albumIndex],
      songs: state.artists[artistIndex].albums[albumIndex].songs.map(
        (song, index) => (index === songIndex ? newSong : song)
      ),
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
  on(removeSong, (state, { artistId, albumId, songId }) => {
    // Find artist
    const artistIndex = state.artists.findIndex(
      (artist) => artist.id === artistId
    );
    if (artistIndex === -1) {
      return state;
    }

    // Find album
    const albumIndex = state.artists[artistIndex].albums.findIndex(
      (album) => album.id === albumId
    );
    if (albumIndex === -1) {
      return state;
    }

    // Update album with removed song
    const updatedAlbum: Album = {
      ...state.artists[artistIndex].albums[albumIndex],
      songs: [
        ...state.artists[artistIndex].albums[albumIndex].songs.filter(
          (song) => song.id !== songId
        ),
      ],
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
      const i = artistIt.albums.findIndex(
        (album) => album.id === objectToFav.id
      );
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

    // Find song
    state.artists.forEach((artistIt, loopIndex) => {
      artistIt.albums.forEach((alb) => {
        const songIx = alb.songs.findIndex(
          (song) => song.id === objectToFav.id
        );

        if (songIx != -1) {
          const albIx = artistIt.albums.findIndex(
            (album) => album.id === alb.id
          );

          if (albIx !== -1) {
            songIndex = songIx;
            albumIndex = albIx;
            artistIndex = loopIndex;
          }
        }
      });
    });

    // If song not found, return the current state
    if (songIndex === -1) {
      return state;
    }

    // Update song
    const updatedSong: Song = {
      ...state.artists[artistIndex].albums[albumIndex].songs[songIndex],
      favourite: !objectToFav.favourite,
    };

    // Update album
    const updatedAlbum: Album = {
      ...state.artists[artistIndex].albums[albumIndex],
      songs: state.artists[artistIndex].albums[albumIndex].songs.map(
        (song, index) => (index === songIndex ? updatedSong : song)
      ),
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

  // Handle selecting different album
  on(selectAlbum, (state, { album }) => ({ ...state, selectedAlbum: album }))
);
