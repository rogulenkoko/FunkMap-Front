import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'dateNotification'
})
export class DateNotificationPipe implements PipeTransform {

  transform(value: any): string {
    let result = "";
    if (!value) {
      return;
    }
    var start = moment(value);
    var end = moment(new Date());
    var daysDifference = Math.abs(start.diff(end, "days"));

    var daysFromWeekStart = end.diff(moment().startOf('week'), "days");
    if (daysDifference == 0) {
      result = start.format("HH:mm")
    }

    if (daysDifference > 0 && daysDifference <= daysFromWeekStart) {
      result = start.format("ddd").toString();
    }

    if (daysDifference > daysFromWeekStart && daysDifference < 365) {
      result = start.format("DD.MM").toString();
    }

    if (daysDifference > 365) {
      result = start.format("DD.MM.YY").toString();
    }

    result = start.format("HH:mm").toString();
    return result;
  }

}
