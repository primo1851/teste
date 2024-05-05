import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./modules/databaseModule";
import { UserModule } from "./modules/userModule";
import { AuthModule } from "./modules/authModule";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserController } from "./presentation/controller/UserController";
import { AuthController } from "./auth/authController";
import { AuthService } from "./services/authService";
import { UserService } from "./services/userService";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    JwtModule,
    AuthModule,
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, AuthService],
})
export class AppModule {}
