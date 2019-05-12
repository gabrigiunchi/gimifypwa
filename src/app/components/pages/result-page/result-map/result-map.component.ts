import {Asset} from 'src/app/model/entities/asset';
import {Gym} from 'src/app/model/entities/gym';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material';
import {
  AssetListDialogComponent,
  AssetListDialogData
} from 'src/app/components/modals/dialogs/asset-list-dialog/asset-list-dialog.component';

@Component({
  selector: 'app-result-map',
  templateUrl: './result-map.component.html',
  styleUrls: ['./result-map.component.css']
})
export class ResultMapComponent implements OnChanges {

  @Input() result: Asset[] = [];
  @Input() date: string;
  @Input() from: string;
  @Input() to: string;

  gyms: Gym[] = [];

  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['result']) {
      this.gyms = this.getGyms(this.result);
    }
  }

  onGymClick(gym: Gym) {
    const assetsInGym = this.result.filter(asset => asset.gym.id === gym.id);
    const dialogData: AssetListDialogData = {
      assets: assetsInGym,
      date: this.date,
      from: this.from,
      to: this.to
    };

    this.dialog.open(AssetListDialogComponent, {
      autoFocus: false,
      restoreFocus: false,
      data: dialogData,
      minWidth: '100%',
      height: '100%'
    });
  }

  private getGyms(assets: Asset[]): Gym[] {
    const map = new Map<number, Gym>();

    assets.map(a => a.gym).forEach(gym => {
      if (!map.has(gym.id)) {
        map.set(gym.id, gym);
      }
    });

    return Array.from(map.values());
  }
}
