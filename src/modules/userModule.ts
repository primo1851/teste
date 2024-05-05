import { Module } from "@nestjs/common";
import { usersProviders } from "../repository/UsersProvider";
import { User } from "./userEntity";
import { UserService } from "../services/userService";

@Module({
  providers: [UserService, User, ...usersProviders],
  exports: [UserService],
})
export class UserModule {}
