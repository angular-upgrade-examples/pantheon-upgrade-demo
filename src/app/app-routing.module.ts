import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found.component';

const routes: Routes = [
  {
    path: 'route-1',
    loadChildren: './route-1/route-1.module#Route1Module',
  },
  {
    path: 'route-2',
    loadChildren: './route-2/route-2.module#Route2Module',
  },
  {
    path: 'route-3',
    loadChildren: './route-3/route-3.module#Route3Module',
  },
  {
    path: 'route-4',
    loadChildren: './route-4/route-4.module#Route4Module',
  },
  { path: '', redirectTo: '/route-1', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
