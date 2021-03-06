import {DateTimePipe} from './datetime.pipe';
import {CONSTANTS} from '../../constants';
import {Settings} from 'luxon';

describe('DateTimePipe', () => {
  beforeEach(() => {
    Settings.defaultZoneName = 'Europe/Rome';
  });

  it('create an instance', () => {
    const pipe = new DateTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('should format a string', () => {
    const pipe = new DateTimePipe();
    expect(pipe.transform('2019-05-01T10:00:00+0200', CONSTANTS.DEFAULT_DATETIME_FORMAT)).toBe('2019-05-01T10:00:00+02:00');
    expect(pipe.transform('2019-05-01T10:00:00+0000', CONSTANTS.DEFAULT_DATETIME_FORMAT)).toBe('2019-05-01T12:00:00+02:00');
  });

  it('should format a string with different timezone', () => {
    const pipe = new DateTimePipe();
    expect(pipe.transform('2019-05-01T10:00:00+0000', CONSTANTS.DEFAULT_DATETIME_FORMAT, 'UTC')).toBe('2019-05-01T10:00:00+00:00');
    expect(pipe.transform('2019-05-02', CONSTANTS.DEFAULT_DATETIME_FORMAT, 'UTC')).toBe('2019-05-02T00:00:00+00:00');
  });
});
