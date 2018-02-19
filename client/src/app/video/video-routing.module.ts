import { VideoDetailsComponent } from './video-details/video-details.component';
import { VideoListComponent } from './video-list/video-list.component';
import { config } from './../shared/constants/pages-config';
import { VideoComponent } from './video.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/**
 * holds the video related routes 
 */
const routes: Routes = [
  {
    path:'',
    component:VideoComponent,
    children:[
      {
        path:config.videos.childs.list.name,
        component:VideoListComponent
      },
      {
        path:config.videos.childs.details.name,
        component:VideoDetailsComponent
      }
    ]
  }
];
/**
 * the Video Route decorator that contains needed modules and routs 
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
