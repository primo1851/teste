import { getModelToken } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";
import { UserService } from "../../services/userService";
import { User } from "../../modules/userEntity";
import { Test, TestingModule } from "@nestjs/testing";

describe("UserService", () => {
  let service: UserService;
  let sequelizeMock: typeof Sequelize;
  let userModelMock: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    sequelizeMock = module.get<typeof Sequelize>(getModelToken(User));
    userModelMock = module.get<typeof User>(getModelToken(User));
  });
  const user = {
    name: "testuser",
    email: "test@example.com",
    password: "BigPassw0rd!",
  };
  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a user", async () => {
    await service.createUser(user);
    expect(userModelMock.create).toHaveBeenCalledWith(user);
  });

  it("should find all users", async () => {
    await service.getAllUsers();
    expect(userModelMock.findAll).toHaveBeenCalled();
  });

  it("should find a user by email", async () => {
    await service.getOneUser(user.email);
    expect(userModelMock.findOne).toHaveBeenCalled();
  });

  it("should update a user", async () => {
    const updatedUserData = {
      name: "updateduser",
      email: "test@example.com",
      password: "BigPassw0rd!",
    };
    await service.updateUser(updatedUserData);
    expect(userModelMock.update).toHaveBeenCalled();
  });

  it("should delete a user", async () => {
    const foundUser = { id: 1, email: "test@example.com" };
    (userModelMock.findOne as jest.Mock).mockResolvedValue(foundUser);
    (foundUser as any).destroy = jest.fn();

    await service.deleteUser(user);
    expect(userModelMock.findOne).toHaveBeenCalledWith({
      where: { email: user.email },
    });
    expect((foundUser as any).destroy).toHaveBeenCalled();
  });
});
