import {MaxEndTimePipe} from './max-end-time.pipe';
import {Duration} from 'luxon';

describe('MaxEndTimePipe', () => {
  it('create an instance', () => {
    const pipe = new MaxEndTimePipe();
    expect(pipe).toBeTruthy();
  });

  const duration = (minutes: number): Duration => Duration.fromObject({minutes: minutes});

  it('should calculate the max end time', () => {
    const pipe = new MaxEndTimePipe();
    expect(pipe.transform('10:00', 30, '23:00', duration(30))).toBe('10:30');
    expect(pipe.transform('17:40', 30, '18:00', duration(30))).toBe('18:00');
    expect(pipe.transform('10:30', 30, '23:00', duration(30))).toBe('11:00');
    expect(pipe.transform('23:50', 30, '23:00', duration(30))).toBe('00:00');
    expect(pipe.transform('10:00', 30, '23:00')).toBe('23:00');
    expect(pipe.transform('23:50', 30, '23:00')).toBe('00:00');
  });
});
