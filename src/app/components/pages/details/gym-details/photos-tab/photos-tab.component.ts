import {Component, Input, OnChanges} from '@angular/core';
import {Gym} from 'src/app/model/entities/gym';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GymImageServiceService} from 'src/app/services/server-communication/gym-image-service.service';
import {ImageMetadata} from 'src/app/model/entities/images-metadata';

@Component({
  selector: 'app-photos-tab',
  templateUrl: './photos-tab.component.html',
  styleUrls: ['./photos-tab.component.css']
})
export class PhotosTabComponent implements OnChanges {

  @Input() gym: Gym;
  photos$: Observable<Observable<string>[]>;

  constructor(private gymImageService: GymImageServiceService) {
  }

  ngOnChanges() {
    if (this.gym) {
      this.photos$ = this.gymImageService.getPhotoMetadataOfGym(this.gym)
        .pipe(map((metadata: ImageMetadata[]) => metadata.map(m => this.gymImageService.getPhotoOfGym(m))));
    }
  }

}
