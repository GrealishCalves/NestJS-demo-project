import { ConflictException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/uesr.entity';
import { UserFoundException } from 'src/exceptions/UsernameFoundExceptions';
import { Repository } from 'typeorm';
import { IUserService } from './interface/IUserService';
import { CreateUserParams, FindUserParams } from './types/user.types';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  async findUser(param: FindUserParams): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({ where: param });
  }

  async createUser(param: CreateUserParams): Promise<UserEntity> {
    const existUser = await this.findUser({ username: param.username });
    if (existUser) throw new UserFoundException();

    const newUser = await this.userRepository.create(param);
    return await this.userRepository.save(newUser);
  }
}
