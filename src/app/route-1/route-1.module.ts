import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route1Component } from './route-1.component';
import { Route1RoutingModule } from './route-1-routing.module';

@NgModule({
  declarations: [Route1Component],
  imports: [
    CommonModule,
    Route1RoutingModule,
  ],
})
export class Route1Module { }
