import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true
})
export class TruncateNamePipe implements PipeTransform {

  transform(name: string, maxLength: number = 16, ellipsis: string = "..."): unknown {
    if(name.length > maxLength){
      return name.slice(0, maxLength) + ellipsis
    }
    return name;
  }

}
