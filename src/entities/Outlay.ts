import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Installment } from "./Installment";

@Entity('outlays')
export class Outlay {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'float' })
  value: number;

  @Column({ nullable: true })
  installments_quantity: number;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  pay: Date;

  @Column({ default: false })
  basic: boolean;

  @OneToMany(() => Installment, Installment => Installment.outlay_id)
  installments: Installment[]
}