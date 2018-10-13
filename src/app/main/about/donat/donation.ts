export class Donation{
    constructor(public total: number, public currency: CurrencyType){
        
    }
}

export enum CurrencyType{
    USD = 1,
    RUB = 2
  }