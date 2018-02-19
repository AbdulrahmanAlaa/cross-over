import { JSON_PATHS, USER } from './../constants/defines';
import { User } from './../interfaces/user.interface';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';

import { API_URLS } from './../constants/routes-config';
import { Md5 } from 'ts-md5/dist/md5';
import { StorageService } from './storage.service';

import * as JsonQuery from 'jsonpath';
/**
 * the Auth Service decorator that help angular DI system to work  
 */
@Injectable()
export class AuthService {
/**
 * parameters passed by angular Dependecy Injection 
 * @param storageService 
 * @param http 
 * @param router 
 */
  constructor(
    private storageService: StorageService,
    private http: HttpClient,
    private router: Router
    ) { }

 
    /**
   * Check if the user already have tokens and userProfile
   * @return boolean indicated if the user Authenticated or not
   */
  public isAuthenticated(): boolean {
    return (this.storageService.user|| this.storageService.getStorage(USER)) ? true : false;
  }

/**
 * clear user info and redirect the user to the login page  
 */
  logout() {
    //clear the localStorage and global objects in the service
    this.storageService.empty();
    let sessionId = this.storageService.user.sessionId || this.storageService.getStorage(USER).sessionId || null;
    this.storageService.user= null;
    this.storageService.setStorage(USER,null)
    return this.http.get(API_URLS.LOGOUT + "?sessionId=" + sessionId).subscribe();
  }

  /**
   * Authenticate The User using Auth Service  
   * @param username {string} username
   * @param password {string} Password
   * @param remember {boolean} auto login user 
   */
  authenticate(username: string, password: string, remember: boolean): Observable<any> {
    //Hashing The Password
    password = Md5.hashStr(password) as string;
    //Sending Username and MD5 Password To The Server
    return this.http.post(API_URLS.Login.SESSION_START, { username, password }).map((response) => {
      let status = JsonQuery.value(response, JSON_PATHS.USER.STATUS);
      if (status === "success") {
        this.storageService.status.isLoggedIn = true;
        this.storageService.user = new Object() as User;
        this.storageService.user.username = JsonQuery.value(response, JSON_PATHS.USER.USERNAME) || null;
        this.storageService.user.password = password;
        this.storageService.user.sessionId = JsonQuery.value(response, JSON_PATHS.USER.SESSION_ID) || null;

        if (remember)
          this.storageService.setStorage(USER, this.storageService.user);
      }

      return response;
    });
  }



}