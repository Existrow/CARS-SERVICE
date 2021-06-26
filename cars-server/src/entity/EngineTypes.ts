import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Models } from "./Models";

@Index("engine types_pkey", ["id"], { unique: true })
@Entity("engine_types", { schema: "public" })
export class EngineTypes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @OneToMany(() => Models, (models) => models.engineType)
  models: Models[];
}
