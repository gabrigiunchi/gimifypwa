export interface FilterResult<T, U> {
  content: T[];
  result: T[];
  params: U;
}
