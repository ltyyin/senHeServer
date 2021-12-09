import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

/**
 * 校验用户登录输入内容的Dto
 */
export class LoginDto {
  @ApiProperty({ example: '13528912523', description: '用户手机号码' })
  @MinLength(11)
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '123456', description: '用户密码' })
  @IsNotEmpty()
  password: string;
}
