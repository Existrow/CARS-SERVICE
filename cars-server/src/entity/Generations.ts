import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Models } from "./Models";

@Index("generations_pkey", ["id"], { unique: true })
@Entity("generations", { schema: "public" })
export class Generations {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 200 })
  name: string;

  @Column("integer", { name: "year_from", nullable: true })
  yearFrom: number | null;

  @Column("integer", { name: "year_to", nullable: true })
  yearTo: number | null;

  @OneToMany(() => Models, (models) => models.generation)
  models: Models[];
}
