import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListRoutingModule } from './album-list-routing.module';
import { AlbumListComponent } from './album-list-component/album-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './header-component/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { AlbumCardComponent } from './album-card/album-card.component';

@NgModule({
  declarations: [AlbumListComponent, HeaderComponent, AlbumCardComponent],
  imports: [
    CommonModule,
    AlbumListRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
  ],
})
export class AlbumListModule {}
