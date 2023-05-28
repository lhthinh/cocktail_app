import { ApiProperty } from '@nestjs/swagger'

export class AddImageProductDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any
}
