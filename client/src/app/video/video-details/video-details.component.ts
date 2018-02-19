import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Video } from './../../shared/interfaces/video.interface';
import { Subscription } from 'rxjs/Subscription';
import { VideoService } from './../video.service';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
/**
 * the Video Details component decorator that contains animations info and html and css files 
 */
@Component({
  selector: 'cross-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
  animations: [
    trigger('detailsAnimations', [
      state('small', style({
        transform: 'scale(0)'
      })),
      state('large', style({
        transform: 'scale(1)'
      })),
      transition('small => large', animate('300ms ease-in'))
    ])
  ]
})
export class VideoDetailsComponent implements OnInit {
  /** contain subscription info for url parameters */
  subscriptionParams: Subscription;

  /** contain subscription info for rating of user */
  subscriptionRate: Subscription;

  /** contains the video info/details recieved from server */
  video: Video;

  /** holds the backend server url */
  baseUrl: string = environment.baseURL;

  /** contains current user rate of the video */
  rate: number;

  /** this variable holds data used in animation  */
  state: string = 'small';

  /**  recieves instances of providers from angular DI (dependency Injection) container */
  constructor(private route: ActivatedRoute, private videoService: VideoService) {
    setTimeout(() => {
      this.state = (this.state === 'small') ? 'large' : 'small';
    }, 500);
  }

  /**
   * intiating the default valus from the server 
   */
  ngOnInit() {
    this.subscriptionParams = this.route.params.subscribe(params => {
      this.videoService.getVideoDetails(params['id']).subscribe(video => {
        this.video = video;
        this.video.rateCount = this.calculateRate(video.ratings);
      })
    });

  }

  /**
   * Get the Avg rate for all video rates 
   * @param rating video rates
   */
  calculateRate(rating: number[] = []): number {
    return (rating.reduce((item, next) => item + next, 0)) / rating.length || 0;
  }

  /**
   * Send user rate for the vedio to the server 
   */
  selected() {
    this.subscriptionRate = this.videoService.rating(this.video._id, this.rate).subscribe(res => console.log(res));
  }

  /**
   * Remove all subscriptions from Ram
   */
  ngOnDestroy() {
    this.subscriptionParams.unsubscribe();
  }
}
