import { config } from './../shared/constants/pages-config';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { JSON_PATHS } from './../shared/constants/defines';
import { Component, OnInit, trigger, state, style, transition, animate, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from './../shared/services/auth.service';

import * as JsonQuery from 'jsonpath';
import { Subscription } from "rxjs/Subscription";
/**
 * the login component decorator that contains animations info and html and css places 
 */
@Component({
  selector: 'cross-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('loginAnimations', [
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
export class LoginComponent implements  OnDestroy {
  /** holds all from inputs */
  loginForm: FormGroup;
  /** this variable holds the login Error Messages from server   */
  error: string;
  /** this variable holds data used in routing after login where he came from  */
  returnUrl: string;
  /** this variable holds data used in animation  */
  state: string = 'small';
  /**
   * holds subscription info
   */
  sub: Subscription;
  /**
   * parameters passed by angular Dependecy Injection
   * @param formBuilder 
   * @param router 
   * @param authService 
   * @param activeRoute 
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {
    //used to scale the Login Screen up
    setTimeout(() => {
      this.state = (this.state === 'small') ? 'large' : 'small';
    }, 400);

    //To get the returnUrl from queryString
    this.sub = this.activeRoute.params.subscribe(params => {
      this.returnUrl = params["returnUrl"] || "";
    });
    //defining the form inputs using Model Driven Forms 
    this.loginForm = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: false
    })
  }


  /**
   * Authonticate the user using AuthService passing username and password 
   */
  login() {
    this.authService.authenticate(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.rememberMe).subscribe(response => {
     //Holds the response status sucess or error returned from the server 
      let status = JsonQuery.value(response, JSON_PATHS.USER.STATUS);
      switch (status) {
        case "success":
          let url = this.returnUrl || config.videos.route;
          this.router.navigate([url]);
          break;
        case "error":
          this.error = response.error;
          break;
        default:
          break;
      }
    });
  }
  
  /**
   * Remove all references for subscription in Memory
   */
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
