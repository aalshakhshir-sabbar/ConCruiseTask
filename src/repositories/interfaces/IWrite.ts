export interface IWrite<T> {
  create(item: T): Promise<Object>;
  update(id: string, item: T): Promise<Object>;
  delete(id: string): Promise<Object>;
}
