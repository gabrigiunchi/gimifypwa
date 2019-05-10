import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';
import {Router} from '@angular/router';
import {AvatarService} from 'src/app/services/server-communication/avatar.service';
import {ImageMetadata} from 'src/app/model/entities/images-metadata';
import {DataUrlPipe} from 'src/app/pipes/data-url.pipe';

interface GalleryItem {
  id: string;
  dataUrl: string;
}

@Component({
  selector: 'app-choose-default-avatar',
  templateUrl: './choose-default-avatar.component.html',
  styleUrls: ['./choose-default-avatar.component.css']
})
export class ChooseDefaultAvatarComponent implements OnInit, OnDestroy {

  isLoading = false;
  private _gallery = new Map<string, GalleryItem>();
  private binaries = new Map<string, ArrayBuffer>();
  private subscriptions: Subscription[] = [];
  private gallerySize: number;

  constructor(
    private router: Router,
    private avatarService: AvatarService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    // Get default avatars' metadata
    this.subscriptions.push(this.avatarService.presetAvatarMetadata.subscribe(metadata => {
      this.isLoading = metadata.length > 0;
      this.gallerySize = metadata.length;
      metadata.forEach(m => this.download(m));
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(d => d.unsubscribe());
  }

  avatarSelected(id: string): void {
    console.log('Selected default avatar #' + id);
    this.isLoading = true;
    const avatarBinaries = this.binaries.get(id);
    this.subscriptions.push(this.avatarService.changeAvatar(avatarBinaries).subscribe(() => {
      this.isLoading = false;
      this.router.navigate(['/profile/avatar']);
    }));
  }

  get gallery(): GalleryItem[] {
    return Array.from(this._gallery.values());
  }

  private download(metadata: ImageMetadata): void {
    // Download the avatar and put it in the gallery
    this.subscriptions.push(this.avatarService.download(metadata.id)
      .subscribe(binaries => {
        const newItem: GalleryItem = {id: metadata.id, dataUrl: new DataUrlPipe().transform(binaries)};
        this._gallery.set(metadata.id, newItem);
        this.binaries.set(metadata.id, binaries);

        // Loading stops when all the images are downloaded
        if (this._gallery.size === this.gallerySize) {
          this.isLoading = false;
        }
      }));
  }
}
