import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { userProviders } from '../user.provider';
import { UsersController } from '../user.controller';
import { UsersService } from '../user.service';
import { JwtService } from '@nestjs/jwt';
import { UserResolver } from '../user.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, JwtService, UserResolver],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
