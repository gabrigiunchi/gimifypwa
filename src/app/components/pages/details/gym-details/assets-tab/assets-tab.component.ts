import {Component, OnInit, Input} from '@angular/core';
import {AssetService} from 'src/app/services/server-communication/asset.service';
import {Subscribable, Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Gym} from 'src/app/model/entities/gym';
import {Page} from 'src/app/model/page';
import {Asset} from 'src/app/model/entities/asset';

@Component({
  selector: 'app-assets-tab',
  templateUrl: './assets-tab.component.html',
  styleUrls: ['./assets-tab.component.css']
})
export class AssetsTabComponent implements OnInit {

  readonly pageSize = 5;
  @Input() gym: Gym;
  currentPage: Page<Asset>;
  private currentDownload: Subscription;
  isLoading = false;

  constructor(private assetService: AssetService) {}

  ngOnInit() {
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

  get assets(): Asset[] {
    return this.currentPage ? this.currentPage.content : [];
  }

  get length(): number {
    return this.currentPage ? this.currentPage.totalElements : 0;
  }

  pageChange(pageIndex: number): void {
    this.downloadPage(pageIndex);
  }

}
