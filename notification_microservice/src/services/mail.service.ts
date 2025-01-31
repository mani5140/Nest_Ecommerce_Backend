import { Injectable } from "@nestjs/common";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService{
    private transporter: nodemailer.Transporter;
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
              user: 'd7ca8b1f24a2b9',
              pass: '9fa7dd2c35d42e',
            },
          });
    }

    async sendMail(to: string, token: string): Promise<void> {
        const mailOptions = {
          from: 'youremail@gmail.com',
          to: to,
          subject: 'Account created successfully !!',
          text: `click on the below link to verify !!!  link:http://localhost:3008/api/v1/users/verify/${token}`,
        };
    
        try {
          await this.transporter.sendMail(mailOptions);
          console.log('Mail sent successfully!');
        } catch (error) {
          throw new Error('Failed to send mail !!');
        }
      }

}