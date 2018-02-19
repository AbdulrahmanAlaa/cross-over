import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './storage.service';
import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';

fdescribe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, StorageService],
      imports: [RouterTestingModule, HttpClientModule]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should authenticate the user', inject([AuthService], (service: AuthService) => {
    service.authenticate("ali", "password", true).subscribe((response) => {
      expect(service.isAuthenticated()).toBe(true);
    });
  }));
  it("should log the user out",inject([AuthService], (service: AuthService) => {
    service.authenticate("ali", "password", true).subscribe((response) => {
      service.logout()
      expect(service.isAuthenticated()).toBe(false);
    });
  }));

});
