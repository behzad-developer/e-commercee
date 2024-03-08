import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'behzad',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'passwd',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    example: 62234567,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(61000000)
  @Max(65999999)
  phonenumber: number;
}
