import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogViewerComponent } from './shared/log-viewer.component';
import { PageNotFoundComponent } from './shared/page-not-found.component';
import { UpgradeUtilsModule } from './upgrade-utils/upgrade-utils.module';

@NgModule({
  declarations: [
    AppComponent,
    LogViewerComponent,
    PageNotFoundComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    UpgradeUtilsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
