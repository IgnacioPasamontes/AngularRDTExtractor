
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PanelComponent } from './panel/panel.component';
import { CapitalizePipe } from './capitalize.pipe';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from './table/table.component';
import { FindingsService } from './findings.service';
import { AppRoutingModule } from './app-routing.module';
import { TabsComponent } from './tabs/tabs.component';
import { ExploreComponent } from './explore/explore.component';
import { ConnectComponent } from './connect/connect.component';
import { BrowseComponent } from './browse/browse.component';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { CustomModalComponent } from './dialog/dialog.component';
import { TooltipModule } from "ngx-tooltip";
import { TreeviewModule } from 'ngx-treeview';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DisabledOnSelectorDirective } from './disabled-on-selector.directive';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    PanelComponent,
    CapitalizePipe,
    TableComponent,
    TabsComponent,
    ExploreComponent,
    ConnectComponent,
    BrowseComponent,
    CustomModalComponent,
    DisabledOnSelectorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    IonRangeSliderModule,
    Ng4LoadingSpinnerModule,
    ModalDialogModule.forRoot(),
    TooltipModule,
    TreeviewModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [FindingsService],
  entryComponents: [CustomModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
