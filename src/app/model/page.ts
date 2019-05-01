export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}
