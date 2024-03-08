import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNumber()
  @IsNotEmpty()
  count: number;
}

export class CreateOrderProductsDto {
  @ApiProperty({
    type: [CreateOrderDto],
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @ArrayNotEmpty()
  products: CreateOrderDto[];
}
