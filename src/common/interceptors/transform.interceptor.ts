import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Response } from 'express'
import { I18nContext } from 'nestjs-i18n'
import { map, Observable } from 'rxjs'
import { I18nTranslations } from 'src/generated/i18n.generated'

export interface ResponseInterceptor<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseInterceptor<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseInterceptor<T>> {
    const i18n = I18nContext.current<I18nTranslations>()
    const http = context.switchToHttp()
    const response = http.getResponse<Response>()
    const { statusCode } = response

    return next.handle().pipe(
      map(data => {
        const { responseMessage, responseData } = data || {}
        return {
          status: statusCode,
          code: 1,
          message: responseMessage || i18n.t('system.http.message.success'),
          error: null,
          data: responseData || data,
        }
      }),
    )
  }
}
