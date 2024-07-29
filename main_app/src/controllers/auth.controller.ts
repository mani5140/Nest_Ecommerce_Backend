import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getUsers(): Promise<any> {
    try {
      return this.authService.getAllUsers();
    } catch (error) {
      throw error;
    }
  }

  @Post('/register')
  async registerUser(@Body() body): Promise<any> {
    try {
      return this.authService.registerUser(body);
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  async loginUser(@Body() body): Promise<any> {
    try {
      return this.authService.loginUser(body);
    } catch (error) {
      throw error;
    }
  }
}
