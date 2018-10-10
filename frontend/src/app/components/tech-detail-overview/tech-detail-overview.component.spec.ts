import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechDetailOverviewComponent } from './tech-detail-overview.component';

describe('TechDetailOverviewComponent', () => {
  let component: TechDetailOverviewComponent;
  let fixture: ComponentFixture<TechDetailOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechDetailOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechDetailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
