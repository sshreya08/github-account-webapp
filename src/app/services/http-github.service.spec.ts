import { TestBed } from '@angular/core/testing';

import { HttpGithubService } from './http-github.service';

describe('HttpGithubService', () => {
  let service: HttpGithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpGithubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
