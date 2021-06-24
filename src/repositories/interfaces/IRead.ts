export interface IRead<T> {
    find(item: T): Promise<T[]>;
    getAll(id: string): Promise<T[]>;
}
