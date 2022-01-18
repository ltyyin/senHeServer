import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class PhoneRegisterDto {
  @ApiProperty({ example: '13528912523' })
  @MinLength(11)
  @IsNotEmpty()
  phone: string;

  name: string;
}
