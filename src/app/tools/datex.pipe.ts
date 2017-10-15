import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "app/core";

@Pipe({
  name: 'datex'
})
export class DatexPipe implements PipeTransform {

  constructor(private translateService: LanguageService){

  }

  transform(value: Date, format: string): any {
    if(!(value instanceof Date && value.getTime() === value.getTime())){
      return null;
    }
    moment.lang(this.translateService.language);
    if (!value) {
      return null;
    }
    var m = moment(value);
    if (!m) {
      return null;
    }

    return m.format(format);
  }

}
