import { AuthGuard } from './shared/guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { config } from "./shared/constants/pages-config";
/**
 * holds application routes for lazy loading modules
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: config.videos.name,
    pathMatch: 'full'
  },
  {
    path: config.videos.name,
    loadChildren: config.videos.loadChildren,
    canLoad: [AuthGuard],
    canActivate:[AuthGuard]
  },
  {
    path: config.login.name,
    loadChildren: config.login.loadChildren
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];
/**
 * the App Route decorator that contains needed modules and routs 
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
