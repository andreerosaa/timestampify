import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistsService } from './services/artists.service';
import { HttpClientModule } from '@angular/common/http';
import { AlbumDetailsModule } from './modules/album-details/album-details.module';
import { AlbumListModule } from './modules/album-list/album-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { artistReducer } from './state/artists/artist.reducer';
import { ArtistEffects } from './state/artists/artist.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    AlbumListModule,
    AlbumDetailsModule,
    StoreModule.forRoot({ artistsState: artistReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
    EffectsModule.forRoot(ArtistEffects)
  ],
  providers: [ArtistsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
