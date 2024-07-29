import {
  Controller,
  Get,
  Param,
  BadRequestException
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/entities/user.entity';
import { MessagePattern } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { RegisterUserDto } from 'src/models/dtos/register.dto';
import { LoginUserDto } from 'src/models/dtos/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  generateToken(payload: any): string {
    return jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRY,
    });
  }

  @MessagePattern({ cmd: 'allUsers' })
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'registerUser' })
  async registerUser(registerDetails: RegisterUserDto): Promise<object> {
    try {
      let { name, email, password, userType} = registerDetails;
      if ([name, email, password].some((field) => field?.trim() === '')) {
        throw new BadRequestException('All fields are required');
      }

      const existingUser = await this.userService.findByEmail(email);

      if (existingUser) {
        throw new BadRequestException('User Already Exists');
      }
      password = await bcrypt.hash(password, 10);
      const result = await this.userService.create({ name, email, password, userType});
      delete result.password;
      const token = this.generateToken({
        id: result.id,
      });
      this.userService.sendVerificationMail(result,token);

      return {result,token};
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'login' })
  async login(loginDetails: LoginUserDto) {
    const {email, password} = loginDetails;
    try {
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new BadRequestException("User doesn't exists !!");
      }

      if (!user.isActive) {
        throw new BadRequestException('User is not verified !!');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password !!');
      }

      const token = this.generateToken({
        id: user.id,
      });

      return { message: 'success', token };
    } catch (error) {
      throw error;
    }
  }

  @Get('verify/:token')
  async get(@Param('token') token: string) {
    try {
      let payload = await jwt.verify(token, process.env.JWT_KEY);
      const user = await this.userService.findOne(payload.id);

      if (!user) {
        throw new BadRequestException('Invalid User !!');
      }
      user.isActive = true;
      const response = await this.userService.update(payload.id, user);
      delete response.password;
      return response;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'authentication' })
  async userAuthentication(token: string): Promise<User> {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY);
      const user = await this.userService.findOne(payload.id);

      if (!user) {
        throw new BadRequestException('Invalid User !!');
      }
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'getUser' })
  async getUser(id: number): Promise<User> {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw error;
    }
  }
}
