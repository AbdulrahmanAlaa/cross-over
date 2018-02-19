import { AuthService } from './../shared/services/auth.service';
import { User } from './../shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { StorageService } from './../shared/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { config } from "../shared/constants/pages-config";
/**
 * the navigation component decorator that contains info and html and css related to the class 
 */
@Component({
  selector: 'cross-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  /**
   * holds the user login status object to point for same object in Storage Service
   */
  status: { isLoggedIn: boolean };
  /**
   * using angular DI system to inject needed services in single tone 
   * @param storageService 
   * @param router 
   * @param authService 
   */
  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService
  ) {
    /**
     * get the user status from storage service to show login Or logout in nav bar
     */
    this.status = this.storageService.status;
  }

  /**
   * clear all the info about the user and redirect him to login page
   */
  logout() {
    this.authService.logout();
    this.storageService.status.isLoggedIn = false;
    this.router.navigate([config.login.route]);
  }
}
