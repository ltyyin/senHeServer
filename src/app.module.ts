import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { VerifyModule } from './common/verify/verify.module';
import { ConfigModule } from '@nestjs/config';
import { OssModule } from './common/oss/oss.module';
import { UsersModule } from './modules/users/users.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { ChannelsModule } from './modules/channels/channels.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    VerifyModule,
    AuthModule,
    OssModule,
    UsersModule,
    ArticlesModule,
    ChannelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
