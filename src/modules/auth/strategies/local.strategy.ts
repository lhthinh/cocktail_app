import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { I18nTranslations } from 'src/generated/i18n.generated'
import { I18nContext } from 'nestjs-i18n'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const i18n = I18nContext.current<I18nTranslations>()

    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException(i18n.t('system.http.status.401'))
    }
    return user
  }
}
