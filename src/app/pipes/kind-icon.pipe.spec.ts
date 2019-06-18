import {KindIconPipe} from './kind-icon.pipe';

describe('KindIconPipe', () => {
  it('create an instance', () => {
    const pipe = new KindIconPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the icon of an asset kind', () => {
    const pipe = new KindIconPipe();
    expect(pipe.transform({id: 1, maxReservationTime: 20, name: 'treadmill'})).toBe('fitness_center');
  });
});
