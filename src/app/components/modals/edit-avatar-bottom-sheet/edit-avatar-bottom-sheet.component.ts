import {Component} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';
import {AvatarService} from 'src/app/services/server-communication/avatar.service';

export enum EditAvatarActionEnum {
  cancel,
  delete,
  openGallery,
  chooseFromDefault,
  modifyCurrent,
}

interface EditAvatarAction {
  title: string;
  icon: string;
  action: EditAvatarActionEnum;
  color?: string;
  isVisible?: () => boolean;
}

@Component({
  selector: 'app-edit-avatar-bottom-sheet',
  templateUrl: './edit-avatar-bottom-sheet.component.html',
  styleUrls: ['./edit-avatar-bottom-sheet.component.css']
})
export class EditAvatarBottomSheetComponent {

  actions: EditAvatarAction[] = [
    {
      action: EditAvatarActionEnum.delete,
      color: 'red',
      icon: 'delete',
      isVisible: () => !this.avatarService.isDefaultAvatar,
      title: 'Restore default'
    },

    {
      action: EditAvatarActionEnum.modifyCurrent,
      icon: 'crop_rotate',
      isVisible: () => !this.avatarService.isDefaultAvatar,
      title: 'Modify current avatar'
    },

    {
      action: EditAvatarActionEnum.chooseFromDefault,
      icon: 'tag_faces',
      title: 'Choose from default avatars'
    },

    {
      action: EditAvatarActionEnum.openGallery,
      icon: 'insert_photo',
      title: 'Choose from gallery'
    },

    {
      action: EditAvatarActionEnum.cancel,
      icon: 'cancel',
      title: 'Cancel'
    },
  ];

  constructor(
    private avatarService: AvatarService,
    private bottomSheetRef: MatBottomSheetRef<EditAvatarBottomSheetComponent>) {
  }

  onSelection(action: EditAvatarAction): void {
    this.bottomSheetRef.dismiss(action.action);
    if (action.action === EditAvatarActionEnum.openGallery) {
      document.getElementById('filePicker').click();
    }
  }

}
