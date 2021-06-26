import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AdImage } from "./AdImage";
import { Models } from "./Models";
import { Users } from "./Users";
import { UserAdCompare } from "./UserAdCompare";
import { UserFavourite } from "./UserFavourite";

@Index("ads_pkey", ["id"], { unique: true })
@Entity("ads", { schema: "public" })
export class Ads {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "count_owners" })
  countOwners: number;

  @Column("character varying", { name: "vin" })
  vin: string;

  @Column("integer", { name: "mileage" })
  mileage: number;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 2000,
  })
  description: string | null;

  @Column("character varying", {
    name: "sale_place",
    nullable: true,
    length: 200,
  })
  salePlace: string | null;

  @Column("integer", { name: "price", nullable: true })
  price: number | null;

  @Column("boolean", {
    name: "is_sold",
    nullable: true,
    default: () => "false",
  })
  isSold: boolean | null;

  @Column("character varying", { name: "hex_color_code", nullable: true })
  hexColorCode: string | null;

  @Column("character varying", { name: "plate_number", nullable: true })
  plateNumber: string | null;

  @OneToMany(() => AdImage, (adImage) => adImage.ad)
  adImages: AdImage[];

  @ManyToOne(() => Models, (models) => models.ads, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "model_id", referencedColumnName: "id" }])
  model: Models;

  @ManyToOne(() => Users, (users) => users.ads)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => UserAdCompare, (userAdCompare) => userAdCompare.ad)
  userAdCompares: UserAdCompare[];

  @OneToMany(() => UserFavourite, (userFavourite) => userFavourite.ad)
  userFavourites: UserFavourite[];
}
