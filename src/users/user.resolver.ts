// src/auth/auth.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { User } from './entities/user.entity';
import { Logger } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);
  constructor(private readonly userService: UsersService) {}

  @Mutation()
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.userService.registerUser({ email, password });
  }
}
