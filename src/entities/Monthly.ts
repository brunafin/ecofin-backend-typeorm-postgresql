import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('monthly')
export class Monthly {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  month: string;

  @Column()
  year: string;

  @Column({ nullable: true })
  amount: number;

  @Column({ nullable: true })
  outlay: number;

  @Column({ nullable: true })
  economy: number;
}