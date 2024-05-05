import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UserDto } from "../dtos/userDto";
import { UserService } from "../../services/userService";
import { User } from "../../modules/userEntity";

@Controller("users")
export class UserController {
  constructor(private readonly service: UserService) {}

  @Put()
  @HttpCode(200)
  async updateUsers(@Body() user: User) {
    console.log("User update was requested");
    const result = await this.service.updateUser(user);
    if (!result) {
      throw new BadRequestException({
        code: "User was not updated",
        success: false,
      });
    }
    console.log("User update was successful");
    return result;
  }

  @Get()
  @HttpCode(200)
  async getAll() {
    console.log("All info is shown");
    const result = await this.service.getAllUsers();
    if (!result) {
      throw new BadRequestException({
        code: "Users can not be shown",
        success: false,
      });
    }
    return result;
  }

  @Delete(":email")
  @HttpCode(200)
  deleteUser(@Body() user: User) {
    const result = this.service.deleteUser(user);
    if (!result) {
      throw new BadRequestException({
        code: "User can not be deleted",
        success: false,
      });
    }
    console.log("User was deleted");
  }
}
