import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ImageCropperService} from 'src/app/services/image-cropper.service';

@Component({
  selector: 'app-avatar-editor',
  templateUrl: './avatar-editor.component.html',
  styleUrls: ['./avatar-editor.component.css']
})
export class AvatarEditorComponent {

  image: string;

  constructor(
    private imageCropperService: ImageCropperService,
    private router: Router) {

    if (this.imageCropperService.getImageToEdit().isPresent) {
      this.image = this.imageCropperService.getImageToEdit().get();
    }
  }

  submit(result: Blob) {
    this.imageCropperService.setResult(result);
    this.back();
  }

  cancel() {
    this.imageCropperService.clear();
    this.back();
  }

  private back() {
    this.router.navigate(['profile/avatar']);
  }
}
