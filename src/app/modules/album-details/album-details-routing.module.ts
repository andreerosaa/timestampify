import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from '../album-list/album-list-component/album-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: AlbumListComponent,
    loadChildren: () => import('../album-list/album-list.module').then((m) => m.AlbumListModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumDetailsRoutingModule {}
