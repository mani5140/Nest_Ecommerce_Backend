import { Body, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ProductService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3003,
      },
    });
  }

  async getAllProducts(): Promise<any> {
    const pattern = { cmd: 'getAllProducts' };
    return await this.client.send(pattern, {}).toPromise();
  }

  async createProduct(body): Promise<any> {
    const pattern = { cmd: 'createProduct' };
    return await this.client.send(pattern, body).toPromise();
  }

  async updateProduct(body): Promise<any> {
    const pattern = { cmd: 'updateProduct' };
    return await this.client.send(pattern, body).toPromise();
  }

  async deleteProduct(productId: number): Promise<any> {
    const pattern = { cmd: 'deleteProduct' };
    return await this.client.send(pattern, productId).toPromise();
  }

  async getProductsBySeller(sellerId: number): Promise<any> {
    const pattern = { cmd: 'getProductsBySeller' };
    return await this.client.send(pattern, sellerId).toPromise();
  }
}
