import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'size'
})
export class SizePipe implements PipeTransform {

  transform(value: number, args?: any): string {
    console.log(value);

    var mb = 1000000;
    if(value > mb){
      return `${(value/mb).toFixed(1)} mb`;
    }

    var kb = 1000;
    return `${(value/kb).toFixed(1)} kb`;
  }

}
