import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AssetService} from 'src/app/services/server-communication/asset.service';
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

  constructor(private assetService: AssetService) {
  }

  onAssetClick(asset: AssetDTO) {
    this.assetSelected.emit(asset);
  }

  getIcon(asset: AssetDTO): string {
    return this.assetService.getIcon(asset);
  }

  getKindName(asset: AssetDTO): string {
    return asset.kind.name.replace('_', ' ');
  }
}
