import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AssetDTO} from 'src/app/model/dto/assetDTO';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent {

  @Input() showGymDetails = true;
  @Input() assets: AssetDTO[];
  @Output() assetSelected = new EventEmitter<AssetDTO>();

  onAssetClick(asset: AssetDTO) {
    this.assetSelected.emit(asset);
  }
}
