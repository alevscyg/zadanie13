import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3001
  const config = new DocumentBuilder()
        .setTitle('ToDoList')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('Zadanie13')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () => {console.log(`Server started on port = ${PORT}`)});
}
bootstrap();
