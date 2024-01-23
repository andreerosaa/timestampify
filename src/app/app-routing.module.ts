import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumListComponent } from './modules/album-list/album-list-component/album-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'list' },
  {
    path: 'list',
    component: AlbumListComponent,
    loadChildren: () =>
      import('./modules/album-list/album-list.module').then((m) => m.AlbumListModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
