import { NgModule } from '@angular/core';
import { UpgradeUtilsModule } from '../upgrade-utils/upgrade-utils.module';
import { Route4Component } from './route-4.component';
import { Route4RoutingModule } from './route-4-routing.module';

@NgModule({
  declarations: [Route4Component],
  imports: [
    Route4RoutingModule,
    UpgradeUtilsModule,
  ],
})
export class Route4Module { }
