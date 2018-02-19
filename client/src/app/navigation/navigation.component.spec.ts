import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './../shared/services/auth.service';
import { StorageService } from './../shared/services/storage.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';

fdescribe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [StorageService, AuthService],
      declarations: [NavigationComponent],
      imports: [RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should log the user out', () => {
    spyOn(component, "logout");
    component.logout();
    expect(component.logout).toHaveBeenCalled()
  });
}); 
