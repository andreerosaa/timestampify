import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found-component/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
    loadChildren: () => import('./not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFoundRoutingModule {}
