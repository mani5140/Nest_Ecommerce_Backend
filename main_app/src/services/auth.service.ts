import { Body, Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    });
  }

  async getAllUsers(): Promise<any> {
    const pattern = { cmd: 'allUsers' };
    return await this.client.send(pattern,{}).toPromise();
  }

  async registerUser(body): Promise<any>{
    const pattern = {cmd: 'registerUser'};
    return await this.client.send(pattern,body).toPromise();
  }

  async loginUser(body): Promise<any>{
    const pattern = {cmd: 'login'};
    return await this.client.send(pattern,body).toPromise();
  }

  async userAuthentication(token): Promise<any>{
    const pattern = {cmd: 'authentication'};
    return await this.client.send(pattern,token).toPromise();
  }

}
