import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import 'dotenv/config'
import { join } from 'path'

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const host = configService.get('POSTGRES_HOST')
    const port = parseInt(configService.get('POSTGRES_PORT'))
    const database = configService.get('POSTGRES_DATABASE')
    console.log(join(__dirname, '..', '**', '*.entity.{js,ts}'), __dirname)

    return {
      type: 'postgres',
      host,
      port,
      database,
      username: configService.get('POSTGRES_USERNAME'),
      password: configService.get('POSTGRES_PASSWORD'),
      entities: [join(__dirname, '..', '..', '**', '*.entity.{js,ts}')],
      subscribers: [join(__dirname, '..', '..', '**', '*.subscriber.{js,ts}')],
      synchronize: configService.get('NODE_ENV') === 'production' ? false : true, // Tránh dùng trên production có thể gây mất dữ liệu
      logging: true,
    }
  },
}
