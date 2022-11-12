import { UserEntity } from 'src/database/entities/uesr.entity';
import { CreateUserParams, FindUserParams } from '../types/user.types';

export interface IUserService {
  findUser(param: FindUserParams): Promise<UserEntity | undefined>;
  createUser(param: CreateUserParams): Promise<UserEntity>;
}
