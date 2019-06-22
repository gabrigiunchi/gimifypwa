import {Pipe, PipeTransform} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AvatarService} from '../services/server-communication/avatar.service';
import {User} from '../model/entities/user';
import {map} from 'rxjs/operators';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  constructor(private avatarService: AvatarService) {
  }

  transform(user: User): Observable<Observable<ArrayBuffer>> {
    return this.avatarService.getMetadataOfUser(user.id).pipe(map(metadata =>
      metadata.id === AvatarService.DEFAULT_AVATAR_METADATA.id ? of(undefined) : this.avatarService.downloadAvatarOfUser(user.id)
    ));
  }

}
