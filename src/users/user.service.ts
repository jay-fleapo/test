import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User } from './entities/user.entity';
import { Academics } from './entities/academics.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from './dto/create-user-input';

const saltRounds = 12;

export const encrypt = async (value: string) => {
  const key = Buffer.from(process.env.CRYPTO_KEY, 'hex');
  const iv = Buffer.from(process.env.CRYPTO_IV, 'hex');
  const cipher = crypto.createCipheriv('aes256', key, iv);
  return Buffer.concat([cipher.update(value), cipher.final()]).toString('hex');
};

export const decrypt = async (value: string) => {
  const key = Buffer.from(process.env.CRYPTO_KEY, 'hex');
  const iv = Buffer.from(process.env.CRYPTO_IV, 'hex');
  const decipher = crypto.createDecipheriv('aes256', key, iv);
  return Buffer.concat([
    decipher.update(Buffer.from(value, 'hex')),
    decipher.final(),
  ]).toString();
};

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('ACADEMICS_REPOSITORY')
    private academicsRepository: Repository<Academics>,
    @Inject('EXHIBITIONS_REPOSITORY')
    private exhibitionsRepository: Repository<Academics>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async comparePasswords(
    userPassword: string,
    inputPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, userPassword);
  }

  async registerUser(createUserInput: CreateUserInput): Promise<User> {
    const checkExistingUser = this.findByEmail(createUserInput.email);

    if (checkExistingUser)
      throw new HttpException(
        `User ${createUserInput.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    const hashedPassword = await bcrypt.hash(
      createUserInput.password,
      saltRounds,
    );
    const userData = this.userRepository.create({
      ...createUserInput,
      password: hashedPassword,
    });

    const user = await this.userRepository.save(userData);
    return user;
  }
}
