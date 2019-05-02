import {TestBed} from '@angular/core/testing';
import {DateTime} from './date-time';

describe('DateTime', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const dateTime = new DateTime('2019-05-02T10:00:00+0200');
    expect(dateTime).toBeTruthy();
  });

  it('should format a date', () => {
    const dateTime = new DateTime('2019-05-01T10:00:00+0200');
    expect(dateTime.format()).toBe('2019-05-01T10:00:00+0200');
    expect(dateTime.format('DD-MM-YYYY')).toBe('01-05-2019');
    expect(dateTime.format('HH:mm')).toBe('10:00');
    expect(dateTime.format('HH:mm', 'UTC')).toBe('08:00');
  });

  it('should add time', () => {
    const dateTime = new DateTime('2019-05-01T10:00:00+0200');
    const result = dateTime.add(1, 'day');
    expect(result.format()).toBe('2019-05-02T10:00:00+0200');
  });

  it('should add minutes', () => {
    const dateTime = new DateTime('2019-05-01T10:00:00+0200');
    const result = dateTime.addMinutes(10);
    expect(result.format()).toBe('2019-05-01T10:10:00+0200');
  });

  it('should say if it is before a date', () => {
    const dateTime = new DateTime('2019-05-02T10:00:00+0200');
    expect(dateTime.isBefore('2019-06-02T10:00:00+0000')).toBe(true);
    expect(dateTime.isBefore('2019-05-02T10:00:01+0200')).toBe(true);
    expect(dateTime.isBefore('2019-05-01T10:00:00+0200')).toBe(false);
    expect(dateTime.isBefore('2019-05-02T09:59:59+0200')).toBe(false);
  });

  it('should say if it is the same or before a date', () => {
    const dateTime = new DateTime('2019-05-02T10:00:00+0200');
    expect(dateTime.isSameOrBefore('2019-05-02T10:00:00+0200')).toBe(true);
    expect(dateTime.isSameOrBefore('2019-06-02T10:00:00+0000')).toBe(true);
    expect(dateTime.isSameOrBefore('2019-05-02T10:00:01+0200')).toBe(true);
    expect(dateTime.isSameOrBefore('2019-05-01T10:00:00+0200')).toBe(false);
    expect(dateTime.isSameOrBefore('2019-05-02T09:59:59+0200')).toBe(false);
  });

  it('should say if it is after a date', () => {
    const dateTime = new DateTime('2019-05-02T10:00:00+0200');
    expect(dateTime.isAfter('2019-04-02T10:00:00+0000')).toBe(true);
    expect(dateTime.isAfter('2019-05-01T10:00:00+0000')).toBe(true);
    expect(dateTime.isAfter('2019-05-01T09:59:59+0200')).toBe(true);
    expect(dateTime.isAfter('2019-05-02T10:00:01+0200')).toBe(false);
    expect(dateTime.isAfter('2019-05-02T10:00:00+0200')).toBe(false);
  });

  it('should say if it is the same or after a date', () => {
    const dateTime = new DateTime('2019-05-02T10:00:00+0200');
    expect(dateTime.isSameOrAfter('2019-05-02T10:00:00+0200')).toBe(true);
    expect(dateTime.isSameOrAfter('2019-04-02T10:00:00+0000')).toBe(true);
    expect(dateTime.isSameOrAfter('2019-05-01T10:00:00+0000')).toBe(true);
    expect(dateTime.isSameOrAfter('2019-05-01T09:59:59+0200')).toBe(true);
    expect(dateTime.isSameOrAfter('2019-05-02T10:00:01+0200')).toBe(false);
  });

  it('should say if it is between two dates', () => {
    const dateTime = new DateTime('2019-05-02T10:00:00+0200');
    let start = '2019-04-02T10:00:00+0200';
    let end = '2019-05-03T10:00:00+0200';
    expect(dateTime.isBetween(start, end)).toBe(true);

    start = '2019-05-02T09:59:59+0200';
    end = '2019-05-02T10:00:01+0200';
    expect(dateTime.isBetween(start, end)).toBe(true);
  });
});
