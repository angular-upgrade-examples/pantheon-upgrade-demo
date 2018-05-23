import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route3Component } from './route-3.component';

const routes: Routes = [
  {
    path: '',
    component: Route3Component,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Route3RoutingModule { }
