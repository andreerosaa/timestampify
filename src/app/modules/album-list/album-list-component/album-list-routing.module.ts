import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './album-list.component';
import { AlbumDetailsComponent } from '../../album-details/album-details-component/album-details.component';

const routes: Routes = [
  {
    path: 'list',
    component: AlbumListComponent,
    loadChildren: () =>
      import('../album-list.module').then((m) => m.AlbumListModule),
  },
  {
    path: 'album/:albumId',
    component: AlbumDetailsComponent,
    loadChildren: () =>
      import('../../album-details/album-details.module').then(
        (m) => m.AlbumDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumListRoutingModule {}
