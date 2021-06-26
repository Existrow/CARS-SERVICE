import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Models } from "./Models";

@Index("body_types_pkey", ["id"], { unique: true })
@Entity("body_types", { schema: "public" })
export class BodyTypes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 200 })
  name: string;

  @OneToMany(() => Models, (models) => models.bodyType)
  models: Models[];
}
