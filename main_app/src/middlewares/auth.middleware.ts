import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { AuthService } from 'src/services/auth.service';

@Injectable()
export class AuthMiddleWare implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let token = '';

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedException('Please login to get access');
    }

    try {
      const user = await this.authService.userAuthentication(token);

      if (!user) {
        throw new UnauthorizedException('User no longer exists');
      }
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
