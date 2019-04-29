import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(list: any, value: any): any {
    if(list.length==0|| value === 200 ) {
      console.log("money")
      return list;
  }
  const resultArray =[];
    for (const item of list) {
      if(item['carPrice'] < value) {
          resultArray.push(item);
      }
    }
    return resultArray;
  }
}
