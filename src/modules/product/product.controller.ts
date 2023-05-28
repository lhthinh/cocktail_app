import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { productUpload } from 'src/common/config/multer.config'
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger'
import { AddImageProductDto } from './dto/add-image-product.dto'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Thêm product' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file', productUpload))
  @ApiBody({ type: AddImageProductDto })
  @ApiConsumes('multipart/form-data')
  addImage(@UploadedFile() file: Express.Multer.File, @Param('id', ParseIntPipe) id: number) {
    return this.productService.addImage(file, id)
  }
  @Get()
  findAll() {
    return this.productService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id)
  }
}
