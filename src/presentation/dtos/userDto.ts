import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { IsPasswordValid } from "../../decorators/validPassword";

export class UserDto {
  @IsNotEmpty()
  @ApiProperty({ example: "Jane Doe" })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: "JaneDoe@email.com" })
  email: string;

  @IsNotEmpty()
  @IsPasswordValid()
  @ApiProperty({ example: "Bigpassw0rd" })
  password: string;
}
