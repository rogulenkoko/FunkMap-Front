export class PayPalPaymentResult{
    constructor(public redirectUrl: string){

    }

    static ToPayPalPaymentResult(data: any){
        return new PayPalPaymentResult(data.redirectUrl);
    }
}