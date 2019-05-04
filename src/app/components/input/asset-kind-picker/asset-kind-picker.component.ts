import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssetKind} from 'src/app/model/entities/asset-kind';
import {AssetKindService} from 'src/app/services/server-communication/asset-kind.service';
import {SelectionDialogComponent, SelectionDialogData} from '../../modals/dialogs/selection-dialog/selection-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-asset-kind-picker',
  templateUrl: './asset-kind-picker.component.html',
  styleUrls: ['./asset-kind-picker.component.css']
})
export class AssetKindPickerComponent implements OnInit {

  @Input() result: AssetKind;
  @Output() resultChange = new EventEmitter<AssetKind>();

  private assetKinds: AssetKind[];

  constructor(private assetKindService: AssetKindService, private dialog: MatDialog) {}

  ngOnInit() {
    this.assetKindService.assetKinds.subscribe(a => this.assetKinds = a);
  }

  openDialog() {
    const dialogData: SelectionDialogData = {
      choices: this.assetKinds,
      title: 'Select asset kind',
      toStringFunction: (assetKind: AssetKind) => assetKind.name
    };

    this.dialog.open(SelectionDialogComponent, {
      minWidth: '100%',
      height: '100%',
      autoFocus: false,
      restoreFocus: false,
      data: dialogData,
    }).afterClosed().subscribe((result: AssetKind) => {
      if (result) {
        console.log('Selected asset kind:', result);
        this.result = result;
        this.resultChange.emit(this.result);
      }
    });
  }

  get isValid(): boolean {
    return !!this.result;
  }

}
