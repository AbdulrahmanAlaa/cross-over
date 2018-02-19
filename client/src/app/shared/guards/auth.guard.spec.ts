import { PageNotFoundComponent } from './../../page-not-found/page-not-found.component';
import { AppRoutingModule } from './../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './../services/storage.service';
import { AuthService } from './../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { ActivatedRoute, Route, ActivatedRouteSnapshot, UrlSegment, Params, RouterStateSnapshot } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BehaviorSubject } from 'rxjs/Rx';
import { APP_BASE_HREF } from "@angular/common/";


fdescribe('AuthGuard', () => {
  let UrlSegment = new Object() as UrlSegment;
  UrlSegment.path = '/movies';
  UrlSegment.parameters = {};
  let activatedRouteSnapshot: ActivatedRouteSnapshot = {
    url: [UrlSegment]
    , params: {}
    , queryParams: {}
    , fragment: ''
    , data: {}
    , outlet: '',
    component: null,
    routeConfig: null,
    root: null,
    parent: null,
    firstChild: null,
    children: null,
    pathFromRoot: null,
    paramMap: null,
    queryParamMap: null
  };
  let snap: RouterStateSnapshot;
  snap = { url: '/movies', root: null };
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        AuthService,
        StorageService,
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
      declarations: [PageNotFoundComponent],
      imports: [
        RouterTestingModule,
        AppRoutingModule,
        HttpClientModule
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should prevent user from logging in...', inject([AuthGuard, AuthService], (guard: AuthGuard, auth: AuthService) => {
    auth.authenticate("ali", "password", true).subscribe(() => {
      setTimeout(()=>{
       let route: Route = { path: '/movies' };
       expect(guard.canLoad(route)).toBe(false);
      },500);
    });
  }));

  it('should allow user to be moved to movies...', inject([AuthGuard, AuthService], (guard: AuthGuard, auth: AuthService) => {

    auth.authenticate("ali", "password", true).subscribe(() => {
      setTimeout(()=>{
        expect(guard.canActivate(activatedRouteSnapshot, snap)).toBe(true);

      },1000);
    })
  }));

});
