import { StorageService } from './../../shared/services/storage.service';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVideoComponent } from './single-video.component';

fdescribe('SingleVideoComponent', () => {
  let component: SingleVideoComponent;
  let fixture: ComponentFixture<SingleVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
      declarations: [SingleVideoComponent],
      imports: [RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule, RatingModule.forRoot()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVideoComponent);
    component = fixture.componentInstance;
    component.baseUrl = "http://localhost:3000";
    component.id = 0;
    component.video = {
      _id: "5996e481f0f8e12e648bcff2",
      name: "[0] Getting Started With ReactJs",
      ratings: [1, 5, 5, 4, 3, 4, 2, 5, 5, 2, 3, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
      url: "videos/Getting_Started_With_React.js.mp4",
      description: "React.js is a JavaScript library for building user interfaces. - Just the UI: Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, its easy to try it out on a small feature in an existing project. - Virtual DOM: React uses a virtual DOM diff implementation for ultra-high performance. It can also render on the server using Node.js — no heavy browser DOM required. - Data flow: React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.",
    };
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  it('should play video', () => {
    spyOn(component,"play");
    component.play()
    expect(component.play).toBeTruthy();
  });
});
