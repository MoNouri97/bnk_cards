import { IsEmail, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @MinLength(2)
  fullName: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;
}
