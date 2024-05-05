import { Injectable } from "@nestjs/common";
import { User } from "../modules/userEntity";
import { UserDto } from "../presentation/dtos/userDto";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UserService {
  private readonly userRepository: typeof User;

  async createUser(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getOneUser(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { email: email },
    });
  }

  async updateUser(user: UserDto): Promise<[number]> {
    return this.userRepository.update(user, { where: { email: user.email } });
  }

  async deleteUser(user: UserDto) {
    return (
      await this.userRepository.findOne<User>({
        where: { email: user.email },
      })
    ).destroy();
  }
}
