import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Models } from "./Models";

@Index("drive_units_pkey", ["id"], { unique: true })
@Entity("drive_units", { schema: "public" })
export class DriveUnits {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "type", length: 255 })
  type: string;

  @OneToMany(() => Models, (models) => models.driveUnits)
  models: Models[];
}
