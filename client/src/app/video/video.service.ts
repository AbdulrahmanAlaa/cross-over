import { Video } from './../shared/interfaces/video.interface';
import { User } from './../shared/interfaces/user.interface';
import { API_URLS } from './../shared/constants/routes-config';
import { Observable } from 'rxjs/Observable';
import { StorageService } from './../shared/services/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER } from "../shared/constants/defines";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class VideoService {

  /**
    * component constructor and all parameters will injected my angular (dependency injection)
    * @param http 
    * @param storageService 
    */
  constructor(private http: HttpClient, private storageService: StorageService) { }

  /**
   * retrive videos from database
   * @param skip 
   * @param limit 
   * @return Observable<Video[]>
   */
  getVideos(skip: number, limit: number): Observable<Video[]> {

    //holds the videos api url
    let url: string = API_URLS.VIDEOS;

    //current logged in user session id
    let sessionId: string = this.storageService.user.sessionId || this.storageService.getStorage(USER).sessionId;

    //getting the videos from the server 
    return this.http.get(`${url}?sessionId=${sessionId}&skip=${skip}&limit=${limit}`)
      .map((response: any) => {
        return response.data;
      })
  }

  /**
   * retrive video details from server
   * @param id video Id
   */
  getVideoDetails(id: string): Observable<Video> {
    //holds the video api url
    let url: string = API_URLS.VIDEO;

    //current logged in user session id
    let sessionId: string = this.storageService.user.sessionId || this.storageService.getStorage(USER).sessionId;

    //get the needed video detail from server    
    return this.http.get(`${url}?sessionId=${sessionId}&videoId=${id}`)
      .map((response: any) => {
        return response.data;
      })
  }

  /**
   * Send user ratings into Server
   * @param videoId 
   * @param rating 
   */
  rating(videoId: string, rating: number): Observable<Video> {
    //holds the videos api url
    let url: string = API_URLS.RATINGS;

    //current logged in user session id
    let sessionId: string = this.storageService.user.sessionId || this.storageService.getStorage(USER).sessionId;

    //Send user rate for the specific vedio to the server
    return this.http.post(`${url}?sessionId=${sessionId}`, { videoId, rating },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .map((response: any) => {
        return response.data;
      }).catch((err) => err)
  }
}