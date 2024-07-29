import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailService } from 'src/services/mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern({ cmd: 'sendVerificationMail' })
  async sendVerificationMail({userDetails, token}) {
    try {
      const response = await this.mailService.sendMail(
        userDetails.email,
        token,
      );
      console.log(response);
    } catch (error) {
      throw error;
    }
  }
}
