import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListRoutingModule } from './album-list-routing.module';
import { AlbumListComponent } from './album-list-component/album-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AlbumListComponent],
  imports: [CommonModule, AlbumListRoutingModule, MatProgressSpinnerModule],
})
export class AlbumListModule {}
