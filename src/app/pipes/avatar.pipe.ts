import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {AvatarService} from '../services/server-communication/avatar.service';
import {User} from '../model/entities/user';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  constructor(private avatarService: AvatarService) {
  }

  transform(user: User): Observable<ArrayBuffer> {
    return this.avatarService.downloadAvatarOfUser(user.id);
  }

}
