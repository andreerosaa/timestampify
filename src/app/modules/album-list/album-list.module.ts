import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListRoutingModule } from './album-list-routing.module';
import { AlbumListComponent } from './album-list-component/album-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from './header-component/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AlbumCardComponent } from './album-card/album-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [AlbumListComponent, HeaderComponent, AlbumCardComponent],
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    AlbumListRoutingModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule
    ],
})
export class AlbumListModule {}
