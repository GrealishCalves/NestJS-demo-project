import { findUserSelectors } from 'src/modules/user/types/user.types';

export const getUserSelectors = (selectPassword?: boolean) => {
  return selectPassword ? findUserSelectors : findUserSelectors.filter((selector) => selector !== 'password');
};
