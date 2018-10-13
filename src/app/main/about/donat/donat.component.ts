import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { CurrencyType, Donation } from './donation';
import { DonationService } from './donation.service';

declare var paypal;

@Component({
  selector: 'donat',
  templateUrl: './donat.component.html',
  styleUrls: ['./donat.component.scss']
})
export class DonatComponent implements OnInit {

  currencies: SelectItem[] = [
    {value: CurrencyType.USD, label: "USD"},
    {value: CurrencyType.RUB, label: "RUB"}
  ]

  currency: CurrencyType = CurrencyType.RUB;
  total: number = 100;

  constructor(private readonly donationService: DonationService) { }

  ngOnInit() {
  }

  payPalDonation(){
    var donation = new Donation(this.total, this.currency);
    this.donationService.createPaypalDonation(donation).subscribe(response=>{
      window.open(response.redirectUrl, '_blank').open();
    });
  }
}
