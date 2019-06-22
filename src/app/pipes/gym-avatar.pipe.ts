import {Pipe, PipeTransform} from '@angular/core';
import {Gym} from '../model/entities/gym';
import {GymImageService} from '../services/server-communication/gym-image-service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Pipe({
  name: 'gymAvatar'
})
export class GymAvatarPipe implements PipeTransform {

  constructor(private gymImageService: GymImageService) {}

  transform(gym: Gym): Observable<Observable<string>> {
    console.log('Get avatar of gym ' + gym.id);
    return this.gymImageService.getAvatarMetadataOfGym(gym)
      .pipe(map(m => m.id === GymImageService.DEFAULT_AVATAR_METADATA.id ? of(undefined) : this.gymImageService.getPhotoOfGym(m)));
  }

}
