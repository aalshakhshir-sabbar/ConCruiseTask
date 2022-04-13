import { PaginationDTO } from "src/types/paginationdto";

export interface IRead<T> {
  find(pagination: PaginationDTO): Promise<T[]>;
  findOne(id: string): Promise<T>;
}
