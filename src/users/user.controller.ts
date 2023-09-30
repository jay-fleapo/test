import { Controller } from '@nestjs/common';

export class File {
  username: string;
}

@Controller('users')
export class UsersController {}
