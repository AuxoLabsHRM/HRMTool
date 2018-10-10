import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLanguagesComponent } from './all-languages.component';

describe('AllLanguagesComponent', () => {
  let component: AllLanguagesComponent;
  let fixture: ComponentFixture<AllLanguagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllLanguagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
