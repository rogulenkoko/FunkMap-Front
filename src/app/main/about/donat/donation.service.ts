import { Injectable } from '@angular/core';
import { Donation } from './donation';
import { Observable } from 'rxjs';
import { HttpClient } from 'app/core/http/http-client.service';
import { ConfigurationProvider } from 'app/core';
import { PayPalPaymentResult } from 'app/main/payments/models/paypal-payment-result';
import { ServiceType } from 'app/core/configuration/configuration-provider';

@Injectable()
export abstract class DonationService {

  abstract createPaypalDonation(donation: Donation): Observable<PayPalPaymentResult>;

}

@Injectable()
export class DonationServiceHttp extends DonationService {

  constructor(private http: HttpClient) {
    super();
   }

  createPaypalDonation(donation: Donation): Observable<PayPalPaymentResult>{
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Payments)}payment/paypal/donation`, donation).map(x=> PayPalPaymentResult.ToPayPalPaymentResult(x.json()));
  }
}

@Injectable()
export class DonationServiceStub extends DonationService {

  constructor() {
    super();
   }

  createPaypalDonation(donation: Donation): Observable<PayPalPaymentResult>{
    return Observable.of(new PayPalPaymentResult(""));
  }
}