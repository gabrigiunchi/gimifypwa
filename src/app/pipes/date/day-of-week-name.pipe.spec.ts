import {DayOfWeekNamePipe} from './day-of-week-name.pipe';

describe('DayOfWeekNamePipe', () => {
  it('create an instance', () => {
    const pipe = new DayOfWeekNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the long name of a weekDay', () => {
    const pipe = new DayOfWeekNamePipe();
    expect(pipe.transform(1)).toBe('Monday');
    expect(pipe.transform(2)).toBe('Tuesday');
    expect(pipe.transform(3)).toBe('Wednesday');
    expect(pipe.transform(4)).toBe('Thursday');
    expect(pipe.transform(5)).toBe('Friday');
    expect(pipe.transform(6)).toBe('Saturday');
    expect(pipe.transform(7)).toBe('Sunday');

    expect(pipe.transform(1, 'it')).toBe('lunedì');
    expect(pipe.transform(2, 'it')).toBe('martedì');
    expect(pipe.transform(3, 'it')).toBe('mercoledì');
    expect(pipe.transform(4, 'it')).toBe('giovedì');
    expect(pipe.transform(5, 'it')).toBe('venerdì');
    expect(pipe.transform(6, 'it')).toBe('sabato');
    expect(pipe.transform(7, 'it')).toBe('domenica');
  });
});
