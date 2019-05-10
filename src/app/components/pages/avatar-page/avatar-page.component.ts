import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatBottomSheet, MatDialog} from '@angular/material';
import {Subscription} from 'rxjs/internal/Subscription';
import {AvatarService} from 'src/app/services/server-communication/avatar.service';
import {ImageCropperService} from 'src/app/services/image-cropper.service';
import {ConfirmationDialogComponent} from '../../modals/dialogs/confirmation-dialog/confirmation-dialog.component';
import {Router} from '@angular/router';
import {EditAvatarAction, EditAvatarBottomSheetComponent} from '../../modals/edit-avatar-bottom-sheet/edit-avatar-bottom-sheet.component';

@Component({
  selector: 'app-avatar-page',
  templateUrl: './avatar-page.component.html',
  styleUrls: ['./avatar-page.component.css']
})
export class AvatarPageComponent implements OnInit, OnDestroy {
  avatar: string;
  isLoading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private imageCropperService: ImageCropperService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private avatarService: AvatarService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.avatarService.avatarChanged$.subscribe(newAvatar => {
      console.log('Received avatar update');
      this.avatar = newAvatar;
      this.isLoading = false;
    }));

    /**
     * If the cropper has a result then change the avatar
     */
    if (this.imageCropperService.getResult().isPresent) {
      console.log('Image cropper has a result, change the avatar');
      this.isLoading = true;
      this.avatarService.changeAvatar(this.imageCropperService.getResult().get()).subscribe();
      this.imageCropperService.clear();
    } else {
      this.loadAvatar();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  back() {
    this.router.navigate(['./profile']);
  }

  openBottomSheet(): void {
    this.bottomSheet.open(EditAvatarBottomSheetComponent)
      .afterDismissed()
      .subscribe(action => this.handleBottomSheetAction(action));
  }

  onFileSelected(event): void {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.changeAvatar(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  private changeAvatar(image: string): void {
    this.imageCropperService.setImageToEdit(image);
    this.router.navigate(['/profile/avatar/modify']);
  }

  private handleBottomSheetAction(action: EditAvatarAction): void {
    switch (action) {
      case EditAvatarAction.delete:
        this.openConfirmCancellationDialog();
        break;

      case EditAvatarAction.chooseFromDefault:
        this.router.navigate(['profile/avatar/defaults']);
        break;

      case EditAvatarAction.modifyCurrent:
        this.changeAvatar(this.avatar);
        break;

      default:
        break;
    }
  }

  private openConfirmCancellationDialog(): void {
    const dialogData = ConfirmationDialogComponent.DEFAULT_DATA;
    dialogData.confirmAction = 'Delete';
    dialogData.cancelAction = 'Cancel';
    dialogData.confirmColor = 'warn';
    dialogData.title = 'Delete the avatar?';
    dialogData.message = 'This will restore the default avatar';

    this.dialog.open(ConfirmationDialogComponent, {
      restoreFocus: false,
      autoFocus: false,
      data: dialogData
    }).afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.isLoading = true;
        this.avatarService.deleteAvatar().subscribe();
      }
    });
  }

  private loadAvatar(): void {
    this.isLoading = true;
    this.subscriptions.push(this.avatarService.myAvatar
      .subscribe(avatar => {
        this.avatar = avatar;
        this.isLoading = false;
      }));
  }
}