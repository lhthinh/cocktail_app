import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import * as _ from 'lodash'
import { I18nContext } from 'nestjs-i18n'
import { ZodError } from 'zod'
import { I18nTranslations } from '../../generated/i18n.generated'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  logger = new Logger()

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const i18n = I18nContext.current<I18nTranslations>(host)
    const { httpAdapter } = this.httpAdapterHost
    const context = host.switchToHttp()

    // Mặc định sẽ là status 500 và response sẽ là exception
    let error = i18n.t('system.http.status.500')
    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    let httpResponse = exception
    let message = (httpResponse as { [x: string]: string })?.message || i18n.t('system.http.status.500')

    // Nếu là 1 http exception
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus()
      httpResponse = exception.getResponse()
    }

    // Nếu là 1 zod exception
    if (exception instanceof ZodError) {
      httpStatus = HttpStatus.BAD_REQUEST
      httpResponse = exception?.errors?.[0] || exception
    }

    // Nếu là 1 403 exception
    if (exception instanceof ForbiddenException) {
      message = i18n.t('system.http.status.403')
    }

    // Nếu là 1 400 exception
    if (exception instanceof BadRequestException) {
      httpResponse = exception.getResponse()
      message = (httpResponse as { [x: string]: string })?.message
    }

    // Nếu là 1 500 exception
    if (exception instanceof InternalServerErrorException) {
      message = i18n.t('system.http.status.500')
    }

    console.log(typeof exception, 'typeof exception')

    error =
      (_.isString(httpResponse) ? httpResponse : (httpResponse as { [x: string]: string })?.message) ??
      i18n.t('system.http.status.500')

    console.log(exception)

    this.logger.error(JSON.stringify(error || httpResponse))

    const responseBody = {
      status: httpStatus,
      code: -1,
      message,
      error,
      data: null,
    }

    httpAdapter.reply(context.getResponse(), responseBody, httpStatus)
  }
}
