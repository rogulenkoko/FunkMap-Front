import { Injectable } from '@angular/core';

@Injectable()
export class AdaptiveService {

  constructor() { }

  public isMobile(): boolean {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
    else {
      return false;
    }
  }

}

export enum DeviceType {
  Desktop = 1,
  Mobile = 2,
  Tablet = 3
}