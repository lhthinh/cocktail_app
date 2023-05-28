import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import { EditProfileDto } from './dto/edit-profile.dto'
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger'
import { avatarUpload } from 'src/common/config/multer.config'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(':id/edit')
  @UseInterceptors(FileInterceptor('avatar', avatarUpload))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Chỉnh sửa thông tin cá nhân' })
  @ApiBody({
    description: 'Upload Avatar',
    type: EditProfileDto,
  })
  editProfileDto(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() editProfileDto: EditProfileDto,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return this.userService.editProfile(avatar, editProfileDto, userId)
  }

  @ApiOperation({ summary: 'Tạo tài khoản' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @ApiOperation({ summary: 'Xem chi tiết User' })
  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) userId: number) {
    return this.userService.findOneById(userId)
  }
}
