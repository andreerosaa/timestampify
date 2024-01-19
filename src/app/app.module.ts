import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumListComponent } from './components/album-list/album-list.component';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { ArtistsService } from './services/artists.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FavouriteIconComponent } from './components/favourite-icon/favourite-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumListComponent,
    AlbumDetailsComponent,
    FavouriteIconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [ArtistsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
