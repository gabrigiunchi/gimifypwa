import {Component, OnInit, Inject} from '@angular/core';
import {AssetDTO} from 'src/app/model/dto/assetDTO';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {AssetService} from 'src/app/services/server-communication/asset.service';

@Component({
  selector: 'app-asset-details-dialog',
  templateUrl: './asset-details-dialog.component.html',
  styleUrls: ['./asset-details-dialog.component.css']
})
export class AssetDetailsDialogComponent implements OnInit {

  constructor(
    private assetService: AssetService,
    private dialogRef: MatDialogRef<AssetDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssetDTO) {}

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
