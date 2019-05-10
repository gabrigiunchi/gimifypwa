export class Optional<T> {
  private readonly _element: T;

  static of<T>(element: T): Optional<T> {
    return new Optional(element);
  }

  static empty<T>(): Optional<T> {
    return new Optional(undefined);
  }

  constructor(element: T) {
    this._element = element;
  }

  get isPresent(): boolean {
    return this._element !== undefined && this._element != null;
  }

  get(): T {
    return this._element;
  }
}

