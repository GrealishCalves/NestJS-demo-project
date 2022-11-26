import { UserEntity } from 'src/database/entities/uesr.entity';
import { CreateUserParams, FindManyOptions, FindUserParams } from '../types/user.types';

export interface IUserService {
  findUser(param: FindUserParams, options?: FindManyOptions): Promise<UserEntity | undefined>;
  createUser(param: CreateUserParams): Promise<UserEntity>;
}
