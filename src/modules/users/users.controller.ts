import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { PhoneRegisterDto } from './dto/phone-register.dto';

@ApiTags('用户模块')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* 查询账号 */
  @Post()
  @ApiOperation({ summary: '查找一个用户' })
  public findOne(@Body('phone') phoneNum: string) {
    // return this.usersService.findOne(id);
    // return this.usersService.findOne(phoneNum);
    return 'find a user';
  }

  /* 验证码创建账号 */
  @Post('register')
  @ApiOperation({ summary: '创建一个用户(验证码)' })
  public async create(@Body() phoneCreateDto: PhoneRegisterDto) {
    return await this.usersService.verifyCodeRegister(phoneCreateDto);
  }
}
