import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Models } from "./Models";

@Index("transmissions_pkey", ["id"], { unique: true })
@Entity("transmissions", { schema: "public" })
export class Transmissions {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "type", length: 100 })
  type: string;

  @OneToMany(() => Models, (models) => models.transmission)
  models: Models[];
}
