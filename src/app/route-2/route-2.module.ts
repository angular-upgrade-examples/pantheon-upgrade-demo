import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route2Component } from './route-2.component';
import { Route2RoutingModule } from './route-2-routing.module';

@NgModule({
  declarations: [Route2Component],
  imports: [
    CommonModule,
    Route2RoutingModule,
  ],
})
export class Route2Module { }
