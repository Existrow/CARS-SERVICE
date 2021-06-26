import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ads } from "./Ads";
import { Users } from "./Users";

@Index("table_name_id_uindex", ["id"], { unique: true })
@Index("table_name_pk", ["id"], { unique: true })
@Entity("user_favourite", { schema: "public" })
export class UserFavourite {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Ads, (ads) => ads.userFavourites, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ad_id", referencedColumnName: "id" }])
  ad: Ads;

  @ManyToOne(() => Users, (users) => users.userFavourites, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
