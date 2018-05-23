import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Route4Component } from './route-4.component';

const routes: Routes = [
  {
    path: '',
    component: Route4Component,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Route4RoutingModule { }
