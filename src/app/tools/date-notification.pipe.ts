import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'dateNotification'
})
export class DateNotificationPipe implements PipeTransform {

  transform(value: any): string {

    console.log(value);

    let result = "";
    if (!value) {
      return;
    }
    var start = moment(value);
    var end = moment(new Date());
    var daysDifference = Math.abs(start.diff(end, "days"));

    var daysFromWeekStart = end.diff(moment().startOf('week'), "days");
    if (daysDifference == 0) {
      return start.format("HH:mm")
    }

    if (daysDifference > 0 && daysDifference <= daysFromWeekStart) {
      return start.format("ddd").toString();
    }

    if (daysDifference > daysFromWeekStart && daysDifference < 365) {
      return start.format("DD.MM").toString();
    }

    if (daysDifference > 365) {
      return start.format("DD.MM.YY").toString();
    }
    return start.format("HH:mm").toString();
  }

}
