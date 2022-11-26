import { PassportSerializer } from '@nestjs/passport';
import { Services } from 'src/common/constants/services';
import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/modules/user/interface/IUserService';
import { UserEntity } from 'src/database/entities/uesr.entity';
import { validateUser } from '../modules/auth/types/IValidateUser';
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {
    super();
  }
  /**
   * When a user is serialized, store their id in the session.
   * @param {UserEntity} user - The user object that was serialized and saved in the session store
   * @param done - A callback that is invoked with the user object that was serialized.
   */
  serializeUser(user: UserEntity, done: (err: Error, user: validateUser) => void) {
    done(null, { id: user.id });
  }
  /**
   * The deserializeUser function is called by the passport middleware to get the user object from the
   * database
   * @param {UserEntity} user - The user object that was serialized to the session.
   * @param done - A callback that you  must call once you've finished processing the user.
   * @returns The user object is being returned.
   */
  async deserializeUser(user: validateUser, done: (err: Error, user: validateUser) => void) {
    const userDb = await this.userService.findUser({ id: user.id });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
