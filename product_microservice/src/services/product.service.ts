import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/models/product.entity';
import { ProductDto } from 'src/models/dtos/product.dto';
import { User } from 'src/models/user.entity';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  private authClient: ClientProxy;

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {
    this.authClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(productId: number): Promise<Product> {
    return await this.productRepository.findOneBy({ productId });
  }

  async create(product: any): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async update(id: number, user: Product): Promise<Product> {
    return await this.productRepository.save(user);
  }

  async delete(id: number): Promise<any> {
    return await this.productRepository.delete(id);
  }

  async getProductsBySeller(sellerId: number): Promise<Product[]> {
    return this.productRepository.find({
      where: { seller: { id: sellerId } },
      relations: ['seller'],
    });
  }

  async getUser(id: number): Promise<User> {
    const pattern = { cmd: 'getUser' };
    return await this.authClient.send(pattern,id).toPromise();
  }
}
