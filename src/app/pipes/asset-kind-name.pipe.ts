import {Pipe, PipeTransform} from '@angular/core';
import {AssetKind} from '../model/entities/asset-kind';
import {TitleCasePipe} from '@angular/common';

@Pipe({
  name: 'assetKindName'
})
export class AssetKindNamePipe implements PipeTransform {

  transform(kind: AssetKind): string {
    return new TitleCasePipe().transform(kind.name.replace('_', ' '));
  }

}
