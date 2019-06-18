import {Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';

export enum EditAvatarAction {
  cancel,
  delete,
  openGallery,
  chooseFromDefault,
  modifyCurrent,
}

interface Action {
  title: string;
  icon: string;
  action: EditAvatarAction;
  color?: string;
}

@Component({
  selector: 'app-edit-avatar-bottom-sheet',
  templateUrl: './edit-avatar-bottom-sheet.component.html',
  styleUrls: ['./edit-avatar-bottom-sheet.component.css']
})
export class EditAvatarBottomSheetComponent {

  actions: Action[] = [
    {
      action: EditAvatarAction.delete,
      color: 'red',
      icon: 'delete',
      title: 'Restore default'
    },

    {
      action: EditAvatarAction.modifyCurrent,
      icon: 'crop_rotate',
      title: 'Modify current avatar'
    },

    {
      action: EditAvatarAction.chooseFromDefault,
      icon: 'tag_faces',
      title: 'Choose from default avatars'
    },

    {
      action: EditAvatarAction.openGallery,
      icon: 'insert_photo',
      title: 'Choose from gallery'
    },

    {
      action: EditAvatarAction.cancel,
      icon: 'cancel',
      title: 'Cancel'
    },
  ];

  constructor(private bottomSheetRef: MatBottomSheetRef<EditAvatarBottomSheetComponent>) {
  }

  onSelection(action: Action): void {
    this.bottomSheetRef.dismiss(action.action);
    if (action.action === EditAvatarAction.openGallery) {
      document.getElementById('filePicker').click();
    }
  }
}
