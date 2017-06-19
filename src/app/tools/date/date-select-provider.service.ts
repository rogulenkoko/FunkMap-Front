import { Injectable } from '@angular/core';

@Injectable()
export class DateSelectProvider {

  public day: number;
  public month: Month;
  public year: number;

  public months: Array<Month>;

  constructor() {
    this.initMonths();
    this.month = this.months[0];
   }

   public buildDate(): Date{
     var date = new Date(this.year,this.month.id,this.day);
     return date;
   }



   private initMonths(){
    this.months = [
      new Month(0, "Январь"),
      new Month(1, "Февраль"),
      new Month(2, "Март"),
      new Month(3, "Апрель"),
      new Month(4, "Май"),
      new Month(5, "Июнь"),
      new Month(6, "Июль"),
      new Month(7, "Август"),
      new Month(8, "Сентябрь"),
      new Month(9, "Октябрь"),
      new Month(10, "Ноябрь"),
      new Month(11, "Декабрь"),
    ]
   }

}

export class Month{
  constructor(public id: number, public title: string){

  }
}
