import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUpdateEmergencyComponent } from './edit-update-emergency.component';

describe('EditUpdateEmergencyComponent', () => {
  let component: EditUpdateEmergencyComponent;
  let fixture: ComponentFixture<EditUpdateEmergencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUpdateEmergencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUpdateEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
