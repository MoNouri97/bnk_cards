import User from 'entity/User';
import {
    BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity()
export default class Card extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number!: string;

  @Column()
  primaryAccountNumber!: string;

  @ManyToOne(() => User, user => user.cards)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
