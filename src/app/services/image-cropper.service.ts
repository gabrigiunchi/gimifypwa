import {Injectable} from '@angular/core';
import {Optional} from '../model/optional';

@Injectable({
  providedIn: 'root'
})
export class ImageCropperService {

  private imageToEdit: string;
  private result: Blob;

  getImageToEdit(): Optional<string> {
    return Optional.of(this.imageToEdit);
  }

  setImageToEdit(dataUrl: string): void {
    this.imageToEdit = dataUrl;
  }

  getResult(): Optional<Blob> {
    return Optional.of(this.result);
  }

  setResult(element: Blob): void {
    this.result = element;
  }

  clear(): void {
    this.imageToEdit = undefined;
    this.result = undefined;
  }
}
