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
