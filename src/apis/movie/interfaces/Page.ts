
export interface Page<T> {
    content: T;
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}

export function createEmptyPage<T>(): Page<T> {
    return {
        content: [] as T,
        page: 0,
        size: 0,
        totalElements: 0,
        totalPages: 0,
        last: false,
    };
}
