import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request as ExpressRequest } from 'express'
import { CreateAuthDto } from './dto/create-auth.dto'
import { UpdateAuthDto } from './dto/update-auth.dto'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { LoginDto } from './dto/login.dto'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Đăng nhập' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Request() request: ExpressRequest) {
    return this.authService.login(request.user)
  }
}
