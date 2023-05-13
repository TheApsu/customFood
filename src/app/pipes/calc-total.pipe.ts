import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcTotal'
})
export class CalcTotalPipe implements PipeTransform {

  transform(value: any[] ): number {
    
    const price = value.reduce((prev, acc) => {
      return prev += acc.price * acc.amount;
    }, 0)

    return price;
  }

}
