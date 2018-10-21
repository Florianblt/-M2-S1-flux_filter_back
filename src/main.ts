import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v2/api');
  const options = new DocumentBuilder()
    .setTitle('Flux-filter')
    .setDescription('Flux-filter app\'s API')
    .setBasePath('v2/api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v2/api/doc', app, document);
  await app.listen(3000);
}
bootstrap();
