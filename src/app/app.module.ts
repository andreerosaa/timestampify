import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistsService } from './services/artists.service';
import { HttpClientModule } from '@angular/common/http';
import { AlbumDetailsModule } from './modules/album-details/album-details.module';
import { AlbumListModule } from './modules/album-list/album-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    AlbumListModule,
    AlbumDetailsModule,
  ],
  providers: [ArtistsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
