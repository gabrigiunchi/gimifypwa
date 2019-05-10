import {Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';

export enum EditAvatarAction {
  cancel,
  delete,
  openGallery,
  chooseFromDefault,
  modifyCurrent,
}

@Component({
  selector: 'app-edit-avatar-bottom-sheet',
  templateUrl: './edit-avatar-bottom-sheet.component.html',
  styleUrls: ['./edit-avatar-bottom-sheet.component.css']
})
export class EditAvatarBottomSheetComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<EditAvatarBottomSheetComponent>) {
  }

  delete(): void {
    this.bottomSheetRef.dismiss(EditAvatarAction.delete);
  }

  modify(): void {
    this.bottomSheetRef.dismiss(EditAvatarAction.modifyCurrent);
  }

  chooseFromDefault(): void {
    this.bottomSheetRef.dismiss(EditAvatarAction.chooseFromDefault);
  }

  cancel(): void {
    this.bottomSheetRef.dismiss(EditAvatarAction.cancel);
  }

  openFilePicker(): void {
    this.bottomSheetRef.dismiss(EditAvatarAction.openGallery);
    document.getElementById('filePicker').click();
  }
}
