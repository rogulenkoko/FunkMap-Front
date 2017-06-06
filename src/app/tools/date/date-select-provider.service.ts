import { Injectable } from '@angular/core';

@Injectable()
export class DateSelectProvider {

  public day: number;
  public month: Month;
  public year: number;

  public days: Array<number>;
  public years: Array<number>;
  public months: Array<Month>;

  constructor() {
    this.initDays();
    this.initMonths();
    this.initYears();
    this.day = this.days[0];
    this.month = this.months[0];
    this.year = this.years[0];
   }

   public buildDate(): Date{
     var date = new Date(this.year,this.month.id,this.day);
     return date;
   }

   private initDays(){
     this.days = [];
     for(var i = 1; i <= 31; i++){
      this.days.push(i);
     }
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

   private initYears(){
     this.years = [];
     for(var i = 2017; i >= 1950; i--){
      this.years.push(i);
     }
   }

}

export class Month{
  constructor(public id: number, public title: string){

  }
}
