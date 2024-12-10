import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions : {
        enableImplicitConversion : true,
      }
    }),
  );

  // swagger configration
  const swagarConfig = new DocumentBuilder()
    .setTitle('Blog app')
    .setDescription('use the base api url as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense('MIT Licence', 'http://www.opensource.org/licenses/')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swagarConfig);
  SwaggerModule.setup('api', app, document);

// wetuo aws sdk 
const configService = app.get(ConfigService);
config.update({
  credentials : {
    accessKeyId : configService.get("appConfig.awsAccessKeyId"),
    secretAccessKey : configService.get("appConfig.awsSecretAccessKey"),
  },
  region : configService.get("appConfig.awsRegion"),
})
  // enable cors 
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
