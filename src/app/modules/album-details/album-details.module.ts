import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AlbumDetailsComponent } from './album-details-component/album-details.component';
import { FavouriteIconComponent } from './favourite-icon-component/favourite-icon.component';

@NgModule({
  declarations: [AlbumDetailsComponent, FavouriteIconComponent],
  imports: [CommonModule, MatIconModule],
})
export class AlbumDetailsModule {}
