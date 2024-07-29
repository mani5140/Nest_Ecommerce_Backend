import {
  Controller,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from 'src/services/product.service';
import { Product } from 'src/models/product.entity';
import { MessagePattern } from '@nestjs/microservices';
import { ProductDto } from 'src/models/dtos/product.dto';

@Controller('users')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'getAllProducts' })
  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'createProduct' })
  async createProduct(productDto: ProductDto): Promise<Product> {
    try {
      const { name, description, price, category, stock, discount, sellerId } =
        productDto;

      if (
        [name, description, category].some(
          (field) => typeof field === 'string' && field.trim() === '',
        ) ||
        [price, stock, discount, sellerId].some((field) => field == null)
      ) {
        throw new BadRequestException('All fields are required');
      }
      const seller = await this.productService.getUser(sellerId);
      if (!seller || seller.userType !== 'seller') {
        throw new NotFoundException('User is not a seller || Seller not found');
      }
      const product = await this.productService.create({
        name,description,price,category,stock,discount,seller
      });
      return product;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'updateProduct' })
  async updateProduct(body: any): Promise<Product> {
    try {
      const { productId, name, description, price, category, stock, discount, sellerId } =
        body;

      if (
        [name, description, category].some(
          (field) => typeof field === 'string' && field.trim() === '',
        ) ||
        [price, stock, discount, sellerId].some((field) => field == null)
      ) {
        throw new BadRequestException('All fields are required');
      }

      const seller = await this.productService.getUser(sellerId);
      if (!seller || seller.userType !== 'seller') {
        throw new NotFoundException('User is not a seller || Seller not found');
      }

      const product = await this.productService.findOne(productId);
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      Object.assign(product, {
        name, description, price, category, stock, discount
      });

      return await this.productService.update(body.productId, product);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'deleteProduct' })
  async deleteProduct(productId: number): Promise<Product> {
    try {
      return await this.productService.delete(productId);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'getProductsBySeller' })
  async getProductsBySeller(sellerId: number): Promise<Product[]> {
    try {
      return await this.productService.getProductsBySeller(sellerId);
    } catch (error) {
      throw error;
    }
  }
}
