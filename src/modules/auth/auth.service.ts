import { Inject, Injectable } from '@nestjs/common';
import { Services } from 'src/common/constants/services';
import { UserEntity } from 'src/database/entities/uesr.entity';
import { validateUser } from './types/IValidateUser';
import { IUserService } from '../user/interface/IUserService';

@Injectable()
export class AuthService {
  constructor(@Inject(Services.USERS) private readonly userService: IUserService) {}

  async validateUser(username: string, pass: string): Promise<validateUser | null> {
    const user = await this.userService.findUser({ username }, { selectPassword: true });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
