import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './../shared/services/storage.service';
import { AuthService } from './../shared/services/auth.service';
import { TestBed, inject } from '@angular/core/testing';

import { VideoService } from './video.service';

fdescribe('VideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VideoService, 
        AuthService,
         StorageService
        ],
      imports: [
        HttpClientModule,
        RouterTestingModule]
    });
  });

  it('should be created', inject([VideoService], (service: VideoService) => {
    expect(service).toBeTruthy();
  }));
  it('should Get 10 Videos from server ', inject([VideoService,AuthService], (service: VideoService,authService:AuthService) => {
    authService.authenticate("ali","password",true).subscribe(()=>{
      service.getVideos(0,10).subscribe((response)=>{
        expect(response.length).toBe(10);
      });
    });
  }));
  
  it('should Get one video from service ', inject([VideoService,AuthService], (service: VideoService,authService:AuthService) => {
    authService.authenticate("ali","password",true).subscribe(()=>{
      service.getVideoDetails("5996e481f0f8e12e648bcff2").subscribe((response)=>{
        expect(response).toBeDefined();
      });
    });
  }));

});

