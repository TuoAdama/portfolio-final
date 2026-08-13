import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AnalyticService } from './analytic.service';

describe('AnalyticService', () => {
  let service: AnalyticService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AnalyticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
