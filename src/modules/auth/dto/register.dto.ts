import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: '13500000000', description: '用户手机号码' })
  @MinLength(11, { message: '手机号码必须为11位数' })
  @IsNotEmpty({ message: '缺少手机号码必填项' })
  phone: string;

  // @ApiProperty({ description: '用户名称', example: 'Lisa' })
  // @IsNotEmpty({ message: '请输入用户名称' })
  // name: string;

  // @ApiPropertyOptional() 它可以顶替@ApiProperty({ required: false })
  // @ApiProperty({ description: '使用crypto随机生成的盐' })
  // salt: string;

  // @ApiProperty({ required: false, description: '用户年龄', example: 18 })
  // @Min(16, { message: '年龄不能低于16' })
  // age?: string;

  @ApiProperty({
    description: '密码',
    example: '123123',
  })
  password: string;

  salt?: string;
}
