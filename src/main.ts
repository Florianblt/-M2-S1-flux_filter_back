import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
config();
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Flux-filter')
    .setDescription('Flux-filter app\'s API')
    .setBasePath('v2/api')
    .setVersion('1.0')
    .addTag('flows')
    .addTag('apps')
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v2/api/docs', app, document);

  app.use('/api/docs/swagger.json', (req, res) => {
    res.send(document);
  });

  app.setGlobalPrefix('v2/api');
  app.enableCors();
  await app.listen(parseInt(process.env.SERVER_PORT || '3000', 10));
}
bootstrap();
