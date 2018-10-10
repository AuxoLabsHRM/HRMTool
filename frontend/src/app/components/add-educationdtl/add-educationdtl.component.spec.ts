import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEducationdtlComponent } from './add-educationdtl.component';

describe('AddEducationdtlComponent', () => {
  let component: AddEducationdtlComponent;
  let fixture: ComponentFixture<AddEducationdtlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEducationdtlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEducationdtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
