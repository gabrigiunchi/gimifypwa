import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Asset} from 'src/app/model/entities/asset';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent {

  @Input() assets: Asset[];
  @Output() assetSelected = new EventEmitter<Asset>();

  onAssetClick(asset: Asset) {
    this.assetSelected.emit(asset);
  }
}
