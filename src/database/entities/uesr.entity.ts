import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  @Exclude()
  password: string;

  @IsEmail()
  @Column({ name: 'email' })
  email: string;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;
}
