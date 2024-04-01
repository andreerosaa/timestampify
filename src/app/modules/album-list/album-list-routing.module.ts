import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './album-list-component/album-list.component';
import { AlbumDetailsComponent } from '../album-details/album-details-component/album-details.component';
import { NotFoundComponent } from '../not-found/not-found-component/not-found.component';

const routes: Routes = [
  {
    path: 'list',
    component: AlbumListComponent,
    loadChildren: () =>
      import('./album-list.module').then((m) => m.AlbumListModule),
  },
  {
    path: 'album/:albumId',
    component: AlbumDetailsComponent,
    loadChildren: () =>
      import('../album-details/album-details.module').then(
        (m) => m.AlbumDetailsModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
    loadChildren: () =>
      import('../not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumListRoutingModule {}
