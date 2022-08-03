import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Outlay } from "./Outlay";

@Entity('installments')
export class Installment {

  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Outlay, outlay => outlay.installments, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: 'outlay_id' })
  outlay_id: number;

  @Column()
  number_installment: number;

  @Column({ type: 'float' })
  value: number;

  @Column()
  month: string;

  @Column()
  year: string;
}