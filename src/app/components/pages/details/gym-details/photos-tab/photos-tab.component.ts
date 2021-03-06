import {Component, Input, OnChanges} from '@angular/core';
import {Gym} from 'src/app/model/entities/gym';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GymImageService} from 'src/app/services/server-communication/gym-image-service';
import {ImageMetadata} from 'src/app/model/entities/images-metadata';

@Component({
  selector: 'app-photos-tab',
  templateUrl: './photos-tab.component.html',
  styleUrls: ['./photos-tab.component.css']
})
export class PhotosTabComponent implements OnChanges {

  @Input() gym: Gym;
  photos$: Observable<Observable<string>[]>;

  constructor(private gymImageService: GymImageService) {}

  ngOnChanges() {
    this.photos$ = this.gymImageService.getPhotoMetadataOfGym(this.gym)
      .pipe(map((metadata: ImageMetadata[]) => metadata.map(m => this.gymImageService.getPhotoOfGym(m, false))));
  }

}
