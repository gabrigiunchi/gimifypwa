import {TimePipe} from './time.pipe';

describe('TimePipe', () => {
  it('create an instance', () => {
    const pipe = new TimePipe();
    expect(pipe).toBeTruthy();
  });

  it('should format a time', () => {
    const pipe = new TimePipe();
    expect(pipe.transform('2019-05-02T10:00:00+0200')).toBe('10:00');
    expect(pipe.transform('2019-05-02T10:00:00+0000')).toBe('12:00');
  });

  it('should format a time with timezone', () => {
    const pipe = new TimePipe();
    expect(pipe.transform('2019-05-02T10:00:00+0200', 'UTC')).toBe('08:00');
    expect(pipe.transform('2019-05-02T10:00:00+0000', 'UTC')).toBe('10:00');
  });
});
