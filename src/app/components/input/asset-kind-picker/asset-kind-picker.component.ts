import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AssetKind} from 'src/app/model/entities/asset-kind';
import {AssetKindService} from 'src/app/services/server-communication/asset-kind.service';
import {MatDialog} from '@angular/material';
import {
  LazySelectionDialogComponent,
  LazySelectionDialogData
} from '../../modals/dialogs/lazy-selection-dialog/lazy-selection-dialog.component';

@Component({
  selector: 'app-asset-kind-picker',
  templateUrl: './asset-kind-picker.component.html',
  styleUrls: ['./asset-kind-picker.component.css']
})
export class AssetKindPickerComponent {

  @Input() result: AssetKind;
  @Output() resultChange = new EventEmitter<AssetKind>();

  constructor(private assetKindService: AssetKindService, private dialog: MatDialog) {
  }

  openDialog() {
    const dialogData: LazySelectionDialogData = {
      choices$: this.assetKindService.assetKinds,
      title: 'Select type of asset',
      toStringFunction: (assetKind: AssetKind) => assetKind.name
    };

    this.dialog.open(LazySelectionDialogComponent, {
      minWidth: '100%',
      height: '100%',
      autoFocus: false,
      restoreFocus: false,
      data: dialogData,
    }).afterClosed().subscribe((result: AssetKind) => {
      if (result) {
        this.result = result;
        this.resultChange.emit(this.result);
      }
    });
  }

  get isValid(): boolean {
    return !!this.result;
  }

}
