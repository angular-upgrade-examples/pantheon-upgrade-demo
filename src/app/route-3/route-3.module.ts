import { NgModule } from '@angular/core';
import { UpgradeUtilsModule } from '../upgrade-utils/upgrade-utils.module';
import { Route3Component } from './route-3.component';
import { Route3RoutingModule } from './route-3-routing.module';

@NgModule({
  declarations: [Route3Component],
  imports: [
    Route3RoutingModule,
    UpgradeUtilsModule,
  ],
})
export class Route3Module { }
