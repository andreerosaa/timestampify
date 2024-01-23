import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AlbumDetailsComponent } from './album-details-component/album-details.component';
import { FavouriteIconComponent } from './favourite-icon-component/favourite-icon.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlbumDetailsRoutingModule } from './album-details-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { SongListItemComponent } from './song-list-item-component/song-list-item.component';

@NgModule({
  declarations: [AlbumDetailsComponent, FavouriteIconComponent, SongListItemComponent],
  imports: [
    CommonModule,
    AlbumDetailsRoutingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
  ],
})
export class AlbumDetailsModule {}
