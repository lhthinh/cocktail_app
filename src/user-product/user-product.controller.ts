import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { UserProductService } from './user-product.service'
import { CreateUserProductDto } from './dto/create-user-product.dto'
import { UpdateUserProductDto } from './dto/update-user-product.dto'
import { ApiOperation } from '@nestjs/swagger'

@Controller('user-product')
export class UserProductController {
  constructor(private readonly userProductService: UserProductService) {}

  @ApiOperation({ summary: 'Like' })
  @Post()
  create(@Body() createUserProductDto: CreateUserProductDto) {
    return this.userProductService.create(createUserProductDto)
  }

  @ApiOperation({ summary: 'Lấy danh sách like' })
  @Get(':userId')
  findOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.userProductService.findAllByUserId(userId)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProductService.remove(+id)
  }
}
