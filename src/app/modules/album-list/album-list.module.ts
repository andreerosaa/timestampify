import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AlbumListRoutingModule } from './album-list-routing.module';
import { AlbumListComponent } from './album-list-component/album-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './header-component/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { AlbumCardComponent } from './album-card/album-card.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AlbumListComponent, HeaderComponent, AlbumCardComponent],
  imports: [
    CommonModule,
    AlbumListRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class AlbumListModule {}
