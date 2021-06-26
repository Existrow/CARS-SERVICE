import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ads } from "./Ads";

@Index("ad_image_id_uindex", ["id"], { unique: true })
@Index("ad_image_pk", ["id"], { unique: true })
@Entity("ad_image", { schema: "public" })
export class AdImage {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "image", nullable: true })
  image: string | null;

  @ManyToOne(() => Ads, (ads) => ads.adImages, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ad_id", referencedColumnName: "id" }])
  ad: Ads;
}
