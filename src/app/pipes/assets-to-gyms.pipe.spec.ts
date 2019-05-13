import {AssetsToGymsPipe} from './assets-to-gyms.pipe';
import {Asset} from '../model/entities/asset';
import {TestConstants} from '../test-constants';
import {AssetKind} from '../model/entities/asset-kind';

describe('AssetsToGymsPipe', () => {

  const mockGym = TestConstants.mockGym;
  const kind: AssetKind = {id: 1, maxReservationTime: 60, name: 'pressa'};
  const assets: Asset[] = Array.from(new Array(10).keys())
    .map<Asset>(key => ({gym: Object.assign({}, mockGym), id: key + 1, kind: kind, name: ''}));

  it('create an instance', () => {
    const pipe = new AssetsToGymsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform an array of assets into an array of distinct gyms', () => {
    const pipe = new AssetsToGymsPipe();
    assets.slice(0, 3).forEach(a => a.gym.id = 1);
    assets.slice(3, 6).forEach(a => a.gym.id = 2);
    assets.slice(6, 10).forEach(a => a.gym.id = 3);
    expect(assets.map(a => a.gym.id)).toEqual([1, 1, 1, 2, 2, 2, 3, 3, 3, 3]);
    expect(pipe.transform(assets).map(g => g.id)).toEqual([1, 2, 3]);
  });
});
