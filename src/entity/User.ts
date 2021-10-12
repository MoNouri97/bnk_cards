import Card from 'entity/Card';
import {
    BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Card, card => card.user)
  cards: Card[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
