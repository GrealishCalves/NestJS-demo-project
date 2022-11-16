import { Column, CreateDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @Generated('uuid')
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Column({ type: 'varchar', unique: true })
  @Generated('uuid')
  public uuid: string;

  @CreateDateColumn()
  public createdAt: Date;
}
