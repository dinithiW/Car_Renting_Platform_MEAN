import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'place'
})
export class PlacePipe implements PipeTransform {

  transform(list: any, value: any): any {
    console.log(value);
    if(list.length==0|| value === undefined ) {

      return list;
  }
  const resultArray =[];
    for (const item of list) {
      if(item['city']===value) {
          resultArray.push(item);
      }
    }
    return resultArray;
  }

}
