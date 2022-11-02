import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/AllExceptionsFilter.filter';
import { ConfigServices } from './shared/services/app-settings.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());

  const configService = app.select(SharedModule).get(ConfigServices);
  const port = configService.getAppPort().port;

  try {
    await app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

bootstrap();
