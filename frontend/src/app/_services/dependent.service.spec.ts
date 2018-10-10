import { TestBed, inject } from '@angular/core/testing';

import { DependentService } from './dependent.service';

describe('DependentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DependentService]
    });
  });

  it('should be created', inject([DependentService], (service: DependentService) => {
    expect(service).toBeTruthy();
  }));
});
