import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ads } from "./Ads";
import { Feedbacks } from "./Feedbacks";
import { BodyTypes } from "./BodyTypes";
import { Brands } from "./Brands";
import { DriveUnits } from "./DriveUnits";
import { EngineTypes } from "./EngineTypes";
import { Generations } from "./Generations";
import { Transmissions } from "./Transmissions";

@Index("models_pkey", ["id"], { unique: true })
@Entity("models", { schema: "public" })
export class Models {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 100 })
  name: string;

  @Column("character varying", { name: "engine_capacity", length: 18 })
  engineCapacity: string;

  @Column("integer", { name: "hp" })
  hp: number;

  @Column("integer", { name: "year_release", nullable: true })
  yearRelease: number | null;

  @Column("character varying", {
    name: "wheel_position",
    nullable: true,
    length: 200,
    default: () => "'Левый'",
  })
  wheelPosition: string | null;

  @OneToMany(() => Ads, (ads) => ads.model)
  ads: Ads[];

  @OneToMany(() => Feedbacks, (feedbacks) => feedbacks.model)
  feedbacks: Feedbacks[];

  @ManyToOne(() => BodyTypes, (bodyTypes) => bodyTypes.models, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "body_type_id", referencedColumnName: "id" }])
  bodyType: BodyTypes;

  @ManyToOne(() => Brands, (brands) => brands.models, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "brand_id", referencedColumnName: "id" }])
  brand: Brands;

  @ManyToOne(() => DriveUnits, (driveUnits) => driveUnits.models, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "drive_units_id", referencedColumnName: "id" }])
  driveUnits: DriveUnits;

  @ManyToOne(() => EngineTypes, (engineTypes) => engineTypes.models, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "engine_type_id", referencedColumnName: "id" }])
  engineType: EngineTypes;

  @ManyToOne(() => Generations, (generations) => generations.models, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "generation_id", referencedColumnName: "id" }])
  generation: Generations;

  @ManyToOne(() => Transmissions, (transmissions) => transmissions.models, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "transmission_id", referencedColumnName: "id" }])
  transmission: Transmissions;
}
