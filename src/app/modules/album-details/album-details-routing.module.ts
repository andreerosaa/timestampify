import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from '../album-list/album-list-component/album-list.component';
import { NotFoundComponent } from '../not-found/not-found-component/not-found.component';

const routes: Routes = [
  {
    path: 'list',
    component: AlbumListComponent,
    loadChildren: () =>
      import('../album-list/album-list.module').then((m) => m.AlbumListModule),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    loadChildren: () =>
      import('../not-found/not-found.module').then((m) => m.NotFoundModule),
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
export class AlbumDetailsRoutingModule {}
