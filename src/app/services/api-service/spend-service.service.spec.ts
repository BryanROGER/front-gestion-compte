import { TestBed } from '@angular/core/testing';

import { SpendService } from './spend.service';

describe('SpendServiceService', () => {
  let service: SpendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
