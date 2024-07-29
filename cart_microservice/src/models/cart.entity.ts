import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'cartItems'})
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
