import { PaginationDTO } from 'src/types/paginationdto';
import { IRead } from './interfaces/IRead';
import { IWrite } from './interfaces/IWrite';
import { Model } from 'mongoose';

export abstract class BaseRepo<T> implements IWrite<T>, IRead<T> {
  constructor(private readonly model: Model<T>) {}

  async find(query: PaginationDTO = { page: 0, limit: 10 }): Promise<T[]> {
    return this.model
      .find()
      .limit(query.limit)
      .skip(query.page * query.limit);
  }

  async findOne(id: string): Promise<T> {
    return this.model.findById(id);
  }

  async create(item: T): Promise<Object> {
    const entity = new this.model(item);
    entity.save();
    return { success: true };
  }
  async update(id: string, item: T): Promise<Object> {
    this.model.findOneAndUpdate({ _id: id }, item);
    return { success: true };
  }
  async delete(id: string): Promise<Object> {
    this.model.deleteOne({ _id: id });
    return { success: true };
  }
  async deleteMany(ids: string[]): Promise<Object> {
    this.model.deleteMany({
      _id: {
        $in: ids,
      },
    });
    return { success: true };
  }
}
