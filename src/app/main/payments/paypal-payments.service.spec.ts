import { TestBed, inject } from '@angular/core/testing';

import { PaypalPaymentsService } from './paypal-payments.service';

describe('PaypalPaymentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaypalPaymentsService]
    });
  });

  it('should be created', inject([PaypalPaymentsService], (service: PaypalPaymentsService) => {
    expect(service).toBeTruthy();
  }));
});
