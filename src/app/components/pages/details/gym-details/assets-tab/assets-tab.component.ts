import {Component, Input, OnChanges} from '@angular/core';
import {AssetService} from 'src/app/services/server-communication/asset.service';
import {Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Gym} from 'src/app/model/entities/gym';
import {Page} from 'src/app/model/page';
import {AssetDTO} from 'src/app/model/dto/assetDTO';
import {Router} from '@angular/router';
import {CONSTANTS} from 'src/app/constants';

@Component({
  selector: 'app-assets-tab',
  templateUrl: './assets-tab.component.html',
  styleUrls: ['./assets-tab.component.css']
})
export class AssetsTabComponent implements OnChanges {

  readonly pageSize = CONSTANTS.ASSET_PAGE_SIZE;
  @Input() gym: Gym;
  currentPage: Page<AssetDTO>;
  private currentDownload: Subscription;
  isLoading = false;

  constructor(
    private router: Router,
    private assetService: AssetService) {}

  ngOnChanges() {
    if (this.gym) {
      this.downloadPage(0);
    }
  }

  onAssetSelected(asset: AssetDTO) {
    this.router.navigate(['/assets', asset.id]);
  }

  downloadPage(page: number): void {
    if (this.currentDownload) {
      console.log(`Stopping download of page ${page - 1}`);
      this.currentDownload.unsubscribe();
    }

    this.isLoading = true;
    console.log(`Downloading page ${page}`);

    this.currentDownload = this.assetService.getAssetsByGym(this.gym, page, this.pageSize)
      .pipe(finalize(() => {
        this.isLoading = false;
        this.currentDownload = undefined;
      }))
      .subscribe(
        newPage => {
          console.log('Downloaded page', newPage);
          this.currentPage = newPage;
        }
      );
  }

  get assets(): AssetDTO[] {
    return this.currentPage ? this.currentPage.content : [];
  }

  get length(): number {
    return this.currentPage ? this.currentPage.totalElements : 0;
  }

  pageChange(pageIndex: number): void {
    this.downloadPage(pageIndex);
  }

}