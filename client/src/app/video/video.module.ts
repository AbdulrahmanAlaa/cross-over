import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService } from './video.service';

import { VideoRoutingModule } from './video-routing.module';
import { VideoComponent } from './video.component';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { VideoListComponent } from './video-list/video-list.component';

import { RatingModule } from 'ngx-bootstrap/rating';
import { SingleVideoComponent } from './single-video/single-video.component';

/**
 * the Video Module decorator that contains needed modules and providers for Video Module to run
 */
@NgModule({
  imports: [
    CommonModule,
    VideoRoutingModule,
    FormsModule,
    RatingModule.forRoot()
  ],
  providers:[VideoService],
  declarations: [VideoComponent, VideoDetailsComponent, VideoListComponent, SingleVideoComponent]
})
export class VideoModule { }
