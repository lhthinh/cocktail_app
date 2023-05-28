import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule } from '@nestjs/swagger'
import { ENVIRONMENT, PORT } from './common/config/app.config'
import { swaggerConfig } from './common/config/swagger.config'
import { AllExceptionFilter } from './common/filters/all-exception.filter'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors() // CORS
  app.useGlobalFilters(new AllExceptionFilter(app.get(HttpAdapterHost))) // Exception filters
  app.useGlobalInterceptors(new TransformInterceptor()) // Custom response
  //Static file
  app.useStaticAssets(join(__dirname, '..', 'files', 'avatar'), {
    prefix: '/files/avatar/',
  })

  app.useStaticAssets(join(__dirname, '..', 'files', 'product'), {
    prefix: '/files/product/',
  })
  // Swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('swagger-ui', app, document)
  await app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} and environment ${ENVIRONMENT}`)
  })
}
bootstrap()
