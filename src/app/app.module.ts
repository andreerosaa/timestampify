import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistsService } from './services/artists.service';
import { HttpClientModule } from '@angular/common/http';
import { AlbumDetailsModule } from './modules/album-details/album-details.module';
import { AlbumListModule } from './modules/album-list/album-list.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AlbumDetailsModule,
    AlbumListModule,
  ],
  providers: [ArtistsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
