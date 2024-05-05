import { USER_REPOSITORY } from "../constants";
import { User } from "../modules/userEntity";

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
