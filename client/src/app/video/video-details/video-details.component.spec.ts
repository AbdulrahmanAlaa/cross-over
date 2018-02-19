import { AuthService } from './../../shared/services/auth.service';
import { APP_BASE_HREF } from '@angular/common/';
import { PageNotFoundComponent } from './../../page-not-found/page-not-found.component';
import { AppRoutingModule } from './../../app-routing.module';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { StorageService } from './../../shared/services/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { VideoService } from './../video.service';
import { RouterTestingModule } from '@angular/router/testing';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute, UrlSegment, Params } from '@angular/router'

import { VideoDetailsComponent } from './video-details.component';
export class MockActivatedRoute extends ActivatedRoute {
  private paramsSubject = new BehaviorSubject(this.testParams);
  private _testParams: {};

  params = this.paramsSubject.asObservable();

  get testParams() {
    return this._testParams;
  }
  set testParams(newParams: any) {
    this._testParams = newParams;
    this.paramsSubject.next(newParams);
  }
}
fdescribe('VideoDetailsComponent', () => {
 beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageService,
        AuthService,
        VideoService,
        { provide: APP_BASE_HREF, useValue: "/" },
        {
          provide: ActivatedRoute,
          useValue: {
            params: Observable.of({id: "5996e481f0f8e12e648bcff3"})
          }
        }
      ],
      declarations: [VideoDetailsComponent, PageNotFoundComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RatingModule.forRoot(),
        RouterTestingModule,
        HttpClientModule,
        AppRoutingModule
      ]
    })
      .compileComponents();
  }));

  it('should be created', inject([AuthService], (service: AuthService) => {
    let component: VideoDetailsComponent;
    let fixture: ComponentFixture<VideoDetailsComponent>;  
    service.authenticate("ali", "password", true).subscribe(() => {
      fixture = TestBed.createComponent(VideoDetailsComponent);
      component = fixture.componentInstance;
      component.baseUrl = "http://localhost:3000/";
      fixture.detectChanges();
      
      expect(component).toBeDefined();
    })
  }));
});
