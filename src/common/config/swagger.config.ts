import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger'
import { ENVIRONMENT, PREFIX_PATH } from './app.config'

export const swaggerConfig: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle('API')
  .setDescription('Tài liệu API của ứng dụng MIC')
  .setVersion('1.0')
  .addServer(
    (() => {
      switch (ENVIRONMENT) {
        case 'test':
          return '/test-api'
        case 'uat':
          return '/uat-api'
        case 'production':
          return '/production-api'
        default:
          return `${PREFIX_PATH}`
      }
    })(),
  )
  .addBearerAuth()
  .build()
