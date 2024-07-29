import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Product } from './models/entities/product.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT, 10),
      // username: process.env.DB_USER,
      // password: ""+process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'ecommerce',
      entities: [User,Product], 
      synchronize: true,
  }),
  TypeOrmModule.forFeature([User,Product])
  ],
  controllers: [AppController,UserController],
  providers: [AppService,UserService],
})
export class AppModule {}

