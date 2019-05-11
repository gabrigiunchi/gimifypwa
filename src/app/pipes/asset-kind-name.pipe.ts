import {Pipe, PipeTransform} from '@angular/core';
import {AssetKind} from '../model/entities/asset-kind';

@Pipe({
  name: 'assetKindName'
})
export class AssetKindNamePipe implements PipeTransform {

  transform(kind: AssetKind): string {
    return kind.name.replace('_', ' ');
  }

}
