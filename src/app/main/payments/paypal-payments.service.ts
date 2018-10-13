import { Injectable } from '@angular/core';
import { Donation } from 'app/main/about/donat/donation';
import { Observable } from 'rxjs';
import { PayPalPaymentResult } from './models/paypal-payment-result';
import { HttpClient } from 'app/core/http/http-client.service';
import { ConfigurationProvider } from 'app/core';
import { ServiceType } from 'app/core/configuration/configuration-provider';

@Injectable()
export abstract class PaypalPaymentsService {

  constructor() { }

}

@Injectable()
export class PaypalPaymentsServiceHttp extends PaypalPaymentsService {

  constructor(private http: HttpClient) {
    super();
   }
}

@Injectable()
export class PaypalPaymentsServiceStub extends PaypalPaymentsService {

  constructor() {
    super();
   }
}
