import { TestBed } from '@angular/core/testing';

import { EditRegistrationModelServiceService } from './edit-registration-model-service.service';

describe('EditRegistrationModelServiceService', () => {
  let service: EditRegistrationModelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditRegistrationModelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
