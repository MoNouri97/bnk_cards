import { IsEmail, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

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
