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
    .addTag('flows')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v2/api/docs', app, document);

  app.use('/api/docs/swagger.json', (req, res) => {
    res.send(document);
  });

  app.setGlobalPrefix('v2/api');
  await app.listen(3000);
}
bootstrap();
