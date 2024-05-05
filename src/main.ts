import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");
  console.log("Application started");
  const config = new DocumentBuilder()
    .setTitle("User authentication and login")
    .setDescription("Api for user creation, validation and authorization")
    .setVersion("1.0")
    .addTag("User")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  
  await app.listen(3000);
}
bootstrap();
