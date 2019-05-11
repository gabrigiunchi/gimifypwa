import {MinEndTimePipe} from './min-end-time.pipe';

describe('MinEndTimePipe', () => {
  it('create an instance', () => {
    const pipe = new MinEndTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('should calculate the min end time', () => {
    const pipe = new MinEndTimePipe();
    expect(pipe.transform('10:00', 30)).toBe('10:30');
    expect(pipe.transform('10:20', 20)).toBe('10:40');
    expect(pipe.transform('10:30', 30)).toBe('11:00');
    expect(pipe.transform('10:45', 15)).toBe('11:00');
    expect(pipe.transform('23:45', 15)).toBe('00:00');
  });
});
