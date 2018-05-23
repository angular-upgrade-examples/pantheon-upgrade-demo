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
  { path: '', redirectTo: '/route-1', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
