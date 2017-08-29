import { Injectable } from '@angular/core';
import { TranslateSelectItem } from "app/tools/select";

@Injectable()
export class DateSelectProvider {

  public day: number;
  public month: number;
  public year: number;

  public months: Array<Month>;

  constructor() {
    this.initMonths();
    this.month = this.months[0].value;
   }

   public buildDate(): Date{
     console.log(this.year, this.month, this.day);
     var date = new Date(this.year,this.month,this.day);
     console.log(date);
     return date;
   }

   public setDate(date: Date){
     if(!date){
       this.day = undefined;
       this.month = 0;
       this.year = undefined;
       return;
     }
     this.day = date.getDate();
     this.month = date.getMonth();
     this.year = date.getFullYear(); 
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

export class Month extends TranslateSelectItem{
  constructor(id: number, title: string){
    super(id, title);
  }
}
