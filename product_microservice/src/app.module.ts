import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './models/product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { User } from './models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.DATABASE_HOST,
      // port: Number(process.env.DATABASE_PORT),
      // username: process.env.DATABASE_USER,
      // password: String(process.env.DATABASE_PASSWORD),
      // database: process.env.DATABASE_NAME,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'ecommerce',
      entities: [Product, User], 
      synchronize: true,
  }),
  TypeOrmModule.forFeature([Product,User])
  ],
  controllers: [AppController,ProductController],
  providers: [AppService,ProductService],
})
export class AppModule {}
