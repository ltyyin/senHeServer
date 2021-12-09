import { createParamDecorator } from '@nestjs/common';

/* data 是使用这个装饰工厂传进来的参数 */
export const CurrentUser = createParamDecorator((data, req) => req.user);
