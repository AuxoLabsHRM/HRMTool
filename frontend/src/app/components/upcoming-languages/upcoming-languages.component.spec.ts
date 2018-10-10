import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingLanguagesComponent } from './upcoming-languages.component';

describe('UpcomingLanguagesComponent', () => {
  let component: UpcomingLanguagesComponent;
  let fixture: ComponentFixture<UpcomingLanguagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingLanguagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
