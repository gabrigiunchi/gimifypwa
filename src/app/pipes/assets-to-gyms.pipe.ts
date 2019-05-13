import {Pipe, PipeTransform} from '@angular/core';
import {Gym} from '../model/entities/gym';
import {Asset} from '../model/entities/asset';

@Pipe({
  name: 'assetsToGyms'
})
export class AssetsToGymsPipe implements PipeTransform {

  transform(assets: Asset[]): Gym[] {
    const map = new Map<number, Gym>();

    assets.map(a => a.gym).forEach(gym => {
      if (!map.has(gym.id)) {
        map.set(gym.id, gym);
      }
    });

    return Array.from(map.values());
  }

}
