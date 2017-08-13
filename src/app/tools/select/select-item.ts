import { MusicStyle, InstrumentType, ExpirienceType } from "app/main/musician/models";
import { Observable } from "rxjs/Observable";
import { SelectItem } from "primeng/primeng";
import { EntityType } from "app/main/map/models";

export class TranslateSelectItem implements SelectItem {
  constructor(public value: any, label: string | Observable<string>) {
    if (typeof (label) === 'string') {
      this.label = label;
    } else {
      var obs = label as Observable<string>;
      obs.subscribe(text => {
        this.label = text;
      })
    }
  }

  public label: string;
}

export class StylesItem extends TranslateSelectItem {

  constructor(value: MusicStyle, label: string | Observable<string>) {
    super(value, label);
  }
}

export class InstrumentsItem extends TranslateSelectItem {

  constructor(value: InstrumentType, label: string | Observable<string>) {
    super(value, label);
  }

  public label: string;
}

export class EntityItem extends TranslateSelectItem {
  constructor(value: EntityType, label: string | Observable<string>) {
    super(value, label);
  }
}

export class ExpirienceItem extends TranslateSelectItem {
  constructor(value: ExpirienceType, label: string | Observable<string>) {
    super(value, label);
  }
}