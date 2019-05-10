import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';
import {AvatarService} from '../services/server-communication/avatar.service';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  constructor(private avatarService: AvatarService) {
  }

  transform(username: string): Observable<ArrayBuffer> {
    return this.avatarService.downloadAvatarOfUser(username);
  }

}
