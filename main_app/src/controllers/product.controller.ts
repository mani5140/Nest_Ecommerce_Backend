import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from 'src/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<any> {
    try {
      return await this.productService.getAllProducts();
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async createProduct(@Body() body): Promise<any> {
    try {
      return await this.productService.createProduct(body);
    } catch (error) {
      throw error;
    }
  }

  @Patch()
  async updateProduct(@Body() body): Promise<any> {
    try {
      return await this.productService.updateProduct(body);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: number): Promise<any> {
    try {
      return await this.productService.deleteProduct(productId);
    } catch (error) {
      throw error;
    }
  }

  @Get('seller/:sellerId')
  async getProductsBySeller(@Param('sellerId') sellerId: number): Promise<any> {
    try {
      return await this.productService.getProductsBySeller(sellerId);
    } catch (error) {
      throw error;
    }
  }
}
