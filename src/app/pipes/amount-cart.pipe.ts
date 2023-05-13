import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountCart'
})
export class AmountCartPipe implements PipeTransform {

  transform(value: any, isPrice): number {
    if(value){
      const total = value.productsToBuy.reduce((prev, acc) => {
        return prev += isPrice ? acc.price * acc.amount : acc.amount;
      }, 0);
      return total;
    }
    return 0
  }

}
