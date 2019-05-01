import {DatePipe} from './date.pipe';
import {CONSTANTS} from '../constants';

describe('DatePipe', () => {
  it('create an instance', () => {
    const pipe = new DatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should format a string', () => {
    const pipe = new DatePipe();
    expect(pipe.transform('2019-05-01 10:00', CONSTANTS.DEFAULT_DATETIME_FORMAT)).toBe('2019-05-01T10:00:00+0200');
    expect(pipe.transform('2019-05-01 10:00', 'HH:mm')).toBe('10:00');
    expect(pipe.transform('2019-05-01 10:00', CONSTANTS.DEFAULT_DATETIME_FORMAT, 'UTC')).toBe('2019-05-01T10:00:00+0000');
    expect(pipe.transform('2019-05-01T10:00:00+0200', CONSTANTS.DEFAULT_DATETIME_FORMAT)).toBe('2019-05-01T10:00:00+0200');
    expect(pipe.transform('2019-05-01T10:00:00+0000', CONSTANTS.DEFAULT_DATETIME_FORMAT)).toBe('2019-05-01T12:00:00+0200');
    expect(pipe.transform('2019-05-01T10:00:00+0000', CONSTANTS.DEFAULT_DATETIME_FORMAT, 'UTC')).toBe('2019-05-01T10:00:00+0000');
  });
});
