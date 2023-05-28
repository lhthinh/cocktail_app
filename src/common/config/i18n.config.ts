import 'dotenv/config'
import { AcceptLanguageResolver, HeaderResolver, I18nOptions, QueryResolver } from 'nestjs-i18n'
import { join } from 'path'
import { ENVIRONMENT } from './app.config'

export const i18nConfig: I18nOptions = {
  fallbackLanguage: 'vi',
  fallbacks: {
    'vi-*': 'vi',
    'en-*': 'en',
  },
  resolvers: [
    { use: QueryResolver, options: ['lang', 'language', 'locale', 'l'] },
    { use: HeaderResolver, options: ['lang', 'language', 'locale', 'l'] },
    AcceptLanguageResolver,
  ],
  loaderOptions: {
    path: join(__dirname, '..', '..', 'i18n'),
    watch: true,
  },
  typesOutputPath:
    ENVIRONMENT === 'development' && join(__dirname, '..', '..', '..', 'src', 'generated', 'i18n.generated.ts'),
}
