import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

/**
 * 校验用户登录输入内容的Dto
 */
export class LoginDto {
  @ApiProperty({ example: '13511111111', description: '用户手机号码' })
  @MinLength(11, { message: '手机号码必须为11位数' })
  @IsNotEmpty({ message: '手机号码不能为空' })
  phone: string;

  @ApiProperty({ example: '123123', description: '用户密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
