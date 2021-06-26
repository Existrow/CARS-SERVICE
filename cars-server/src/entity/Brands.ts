import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Models } from "./Models";

@Index("brands_pkey", ["id"], { unique: true })
@Entity("brands", { schema: "public" })
export class Brands {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @OneToMany(() => Models, (models) => models.brand)
  models: Models[];
}
