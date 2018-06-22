import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TableComponent } from './table/table.component';
import { ConnectComponent } from './connect/connect.component';
import { ExploreComponent } from './explore/explore.component';
import { BrowseComponent } from './browse/browse.component';

const routes : Routes = [
  {
    path:'connect',
    component: ConnectComponent
  },
  {
    path:'sidebar',
    component: SidebarComponent
  },
  {
    path:'table',
    component: TableComponent
  },
  {
    path:'explore',
    component: ExploreComponent
  },
  {
    path:'browse',
    component: BrowseComponent
  },
  {
    path:'',
    redirectTo: '/connect', 
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
