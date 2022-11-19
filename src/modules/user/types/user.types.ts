import { UserEntity } from 'src/database/entities/uesr.entity';

export type FindUserParams = Partial<{
  id: string;
  username: string;
  email: string;
}>;

export type CreateUserParams = Partial<{
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}>;

export type FindManyOptions = Partial<{
  selectPassword: boolean;
}>;

export const findUserSelectors: (keyof UserEntity)[] = ['id', 'firstName', 'lastName', 'username', 'password'];
