import { ApiProperty } from "@nestjs/swagger";
import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({ tableName: "users" })
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({ example: "Jane Doe" })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  @ApiProperty({ example: "JaneDoe@email.com" })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({ example: "Bigpassw0rd" })
  password: string;
}
