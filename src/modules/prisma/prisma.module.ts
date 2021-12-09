import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET,
        };
      },
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService, JwtModule],
})
export class PrismaModule {}
