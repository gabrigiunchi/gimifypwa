import {Pipe, PipeTransform} from '@angular/core';

/**
 * Convert a image in binary format into a dataURL
 */
@Pipe({
  name: 'dataUrl'
})
export class DataUrlPipe implements PipeTransform {

  transform(binary: ArrayBuffer | Blob): string {
    const blob = new Blob([binary], {type: 'image'});
    const urlCreator = window.URL;
    return urlCreator.createObjectURL(blob);
  }

}
