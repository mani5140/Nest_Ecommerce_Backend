import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailController } from './controllers/mail.controller';
import { MailService } from './services/mail.service';

@Module({
  imports: [],
  controllers: [AppController, MailController],
  providers: [AppService, MailService],
})
export class AppModule {}
