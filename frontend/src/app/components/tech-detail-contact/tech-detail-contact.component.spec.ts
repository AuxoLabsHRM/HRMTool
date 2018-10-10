import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechDetailContactComponent } from './tech-detail-contact.component';

describe('TechDetailContactComponent', () => {
  let component: TechDetailContactComponent;
  let fixture: ComponentFixture<TechDetailContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechDetailContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechDetailContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
