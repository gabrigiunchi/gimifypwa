import {Pipe, PipeTransform} from '@angular/core';
import {AssetKind} from '../model/entities/asset-kind';

@Pipe({
  name: 'kindIcon'
})
export class KindIconPipe implements PipeTransform {

  transform(kind: AssetKind): string {
    return 'fitness_center';
  }

}
