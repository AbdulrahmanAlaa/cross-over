import { environment } from './../../../environments/environment';
import { VideoService } from './../video.service';
import { Video } from './../../shared/interfaces/video.interface';
import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, keyframes, animate, query, stagger } from '@angular/animations';
/**
 * the video list component decorator that contains animations info and html and css files 
 */
@Component({
  selector: 'cross-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-70px)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ]))
        ]), { optional: true })

      ])
    ])
  ]
})
export class VideoListComponent implements OnInit {

  /**  recieves instances of providers from angular DI (dependency Injection) container */
  constructor(private videoService: VideoService) { }

  /** holds current backend server url */
  baseUrl: string = environment.baseURL;

  /** videos array holds all videos details  */
  videos: Video[] = [];

  /**
   * intial videos loaded from server
   */
  ngOnInit() {
    this.loadTenItems();
  }

  /**
   * Loading 10 videos from server each time user scrolls
   */
  loadTenItems() {
    this.videoService.getVideos(this.videos.length, 10).subscribe((videos) => {
      videos.forEach((item) => {
        item.rateCount = this.getRate(item.ratings);
      });
      console.log(videos);
      this.videos.push(...videos);
    });
  }

  /**
   * Determine the scroll of page to load more items 
   */
  onScroll() {
    if (Math.ceil(window.innerHeight + window.scrollY) == Math.ceil(document.body.offsetHeight)) {
      this.loadTenItems();
    }
  }

  /**
   * Get avg rate for each video
   * @param rates {number[]} contain video ratings
   */
  getRate(rates: number[]) {
    return rates.reduce((item, next) => item + next) / rates.length || 0;
  }


}
