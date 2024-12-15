import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

export function appCreate(app : INestApplication) {
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
}