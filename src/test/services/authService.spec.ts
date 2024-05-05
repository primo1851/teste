import { Test, TestingModule } from "@nestjs/testing";

import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { AuthService } from "../../services/authService";
import { UserService } from "../../services/userService";
import { Sequelize } from "sequelize";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../../modules/userEntity";

jest.mock("bcrypt");

describe("AuthService", () => {
  let authService: AuthService;
  let userService: UserService;
  let sequelizeMock: typeof Sequelize;
  let userModelMock: typeof User;
  let jwtService: JwtService;

  const user = {
    name: "testuser",
    email: "test@example.com",
    password: "BigPassw0rd!",
    dataValues: {
      id: 1,
      username: "test@example.com",
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        JwtService,
        {
          provide: getModelToken(User),
          useValue: {
            createUser: jest.fn(),
            getOneUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue("generatedToken"),
          },
        },
      ],
    }).compile();

    sequelizeMock = module.get<typeof Sequelize>(getModelToken(User));
    userModelMock = module.get<typeof User>(getModelToken(User));
    userService = module.get<UserService>(UserService);

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("validateUser", () => {
    it("should return null if user does not exist", async () => {
      userService.getOneUser = jest.fn().mockResolvedValue(null);
      const result = await authService.validateUser("username", "password");
      expect(result).toBeNull();
    });

    it("should return null if passwords do not match", async () => {
      const user = { username: "username", password: "password" };
      userService.getOneUser = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const result = await authService.validateUser(
        "username",
        "wrongpassword"
      );
      expect(result).toBeNull();
    });

    it("should return user data without password if validation passes", async () => {
      userService.getOneUser = jest.fn().mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);

      const result = await authService.validateUser(user.email, user.password);

      expect(result).toEqual({ id: 1, username: user.email });
    });
  });
  describe("login", () => {
    it("should generate token for user", async () => {
      const user = { username: "username" };
      const generatedToken = "generatedToken";
      jest
        .spyOn(authService, "generateToken")
        .mockResolvedValue(generatedToken);
      const result = await authService.login(user);
      expect(result).toEqual({ user, token: generatedToken });
    });
  });
  describe("create", () => {
    it("should create user with hashed password and generate token", async () => {
      userService.createUser = jest.fn().mockResolvedValue(user);

      (bcrypt.hash as jest.Mock).mockResolvedValue(user.password);
      (jwtService.signAsync as jest.Mock).mockResolvedValue("token");

      const result = await authService.create(user);

      expect(userService.createUser).toHaveBeenCalledWith({
        ...user,
        password: user.password,
      });

      expect(result).toEqual({
        user: { id: 1, username: "test@example.com" },
        token: "token",
      });
    });
  });
});
