import { StorageService } from './../../shared/services/storage.service';
import { Video } from './../../shared/interfaces/video.interface';
import { Component, OnInit, Input } from '@angular/core';
/**
 * the single video component decorator that contains info about html and css files
 */
@Component({
  selector: 'cross-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.scss']
})
export class SingleVideoComponent {

/**
 * using angular DI system to inject needed services
 * @param storageService 
 */
  constructor(private storageService: StorageService) { }
  /** holds info about the video   */
  @Input()
  video: Video;

  /** holds info about current video Id in case we need to stop it later */
  @Input()
  id: number;

  /** holds info about current server contains the video data in the environment file    */
  @Input()
  baseUrl: string;

  /**
   * When Playing a Video othes shall stop 
   */
  play() {
    if (this.storageService.currentPlaying && this.storageService.currentPlaying !== `vid-${this.id}`) {
      let ele = document.getElementById(this.storageService.currentPlaying) as HTMLVideoElement;
      ele.pause();
    }
    this.storageService.currentPlaying = `vid-${this.id}`;//

  }

}
