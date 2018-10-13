import { Component, OnInit } from '@angular/core';

declare var paypal;

@Component({
  selector: 'donat',
  templateUrl: './donat.component.html',
  styleUrls: ['./donat.component.scss']
})
export class DonatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    paypal.Button.render({
     

      payment: function(data, actions) {
        /*
         * Set up the payment here
         */
      },

      onAuthorize: function(data, actions) {
        console.log(data);
      },

      onCancel: function(data, actions) {
        /*
         * Buyer cancelled the payment
         */
      },

      onError: function(err) {
        /*
         * An error occurred during the transaction
         */
      }
    }, '#paypal-button');
   }

}
