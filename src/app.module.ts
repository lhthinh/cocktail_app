import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { configConfig } from './common/config/config.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmAsyncConfig } from './common/config/typeorm.config'
import { UserModule } from './modules/user/user.module'
import { I18nModule } from 'nestjs-i18n'
import { i18nConfig } from './common/config/i18n.config'
import { IngredientModule } from './modules/ingredient/ingredient.module'
import { ProductModule } from './modules/product/product.module'
import { IngredientProductModule } from './modules/ingredient-product/ingredient-product.module'
import { MulterModule } from '@nestjs/platform-express'
import { RatingModule } from './modules/rating/rating.module'
import { UserProductModule } from './user-product/user-product.module'

@Module({
  imports: [
    ConfigModule.forRoot(configConfig),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    I18nModule.forRoot(i18nConfig),
    MulterModule.register({
      dest: './files',
    }),
    AuthModule,
    UserModule,
    IngredientModule,
    ProductModule,
    IngredientProductModule,
    RatingModule,
    UserProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
