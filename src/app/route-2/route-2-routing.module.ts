import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route2Component } from './route-2.component';

const routes: Routes = [
  {
    path: '',
    component: Route2Component,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Route2RoutingModule { }
