import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found-component/not-found.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, MatIconModule, RouterModule, MatProgressSpinnerModule],
})
export class NotFoundModule {}
