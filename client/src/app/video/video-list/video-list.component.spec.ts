import { VideoModule } from './../video.module';
import { PageNotFoundComponent } from './../../page-not-found/page-not-found.component';
import { AppRoutingModule } from './../../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SingleVideoComponent } from './../single-video/single-video.component';
import { AuthService } from './../../shared/services/auth.service';
import { StorageService } from './../../shared/services/storage.service';
import { VideoService } from './../video.service';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { VideoListComponent } from './video-list.component';

describe('VideoListComponent', () => {
    // let component: VideoListComponent;
    // let fixture: ComponentFixture<VideoListComponent>;

    // beforeEach(async(() => {
    //     TestBed.configureTestingModule({
    //         providers: [
    //             AuthService,
    //             VideoService
    //             , StorageService],
    //         declarations: [
    //             VideoListComponent,
    //             SingleVideoComponent
    //             , PageNotFoundComponent
    //         ],
    //         imports: [
    //             FormsModule,
    //             HttpClientModule,
    //             AppRoutingModule,
    //             BrowserAnimationsModule,
    //             ReactiveFormsModule,
    //             RatingModule.forRoot(),
    //             RouterTestingModule
    //         ]
    //     })
    //         .compileComponents();
    // }));

    // beforeEach(() => {
    // });

    // it('should be created', inject([AuthService], (service: AuthService) => {
    //     service.authenticate("ali", "password", true).subscribe(() => {
    //         fixture = TestBed.createComponent(VideoListComponent);
    //         component = fixture.componentInstance;
    //         component.baseUrl = "http://localhost:3000/"
    //         fixture.detectChanges();
    //         console.log(component);

    //         expect(component).toBeTruthy();
    //     });
    // }));

});
