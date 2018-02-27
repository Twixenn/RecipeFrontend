import { TestBed, inject } from '@angular/core/testing';

import { EditRecipiesService } from './edit-recipies.service';

describe('EditRecipiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditRecipiesService]
    });
  });

  it('should be created', inject([EditRecipiesService], (service: EditRecipiesService) => {
    expect(service).toBeTruthy();
  }));
});
