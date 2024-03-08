import { DocumentBuilder } from '@nestjs/swagger';

export class SwaggerConfiguration {
  static config() {
    return new DocumentBuilder()
      .setTitle('E-commerce Project')
      .setDescription('E-Commerce API Description')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'bearer',
      })
      .build();
  }
}
