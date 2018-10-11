import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeactivateComponent } from './employeeactivate.component';

describe('EmployeeactivateComponent', () => {
  let component: EmployeeactivateComponent;
  let fixture: ComponentFixture<EmployeeactivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeactivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
