import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ads } from "./Ads";
import { Users } from "./Users";

@Index("user_ad_compare_pk", ["id"], { unique: true })
@Index("user_ad_compare_id_uindex", ["id"], { unique: true })
@Entity("user_ad_compare", { schema: "public" })
export class UserAdCompare {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @ManyToOne(() => Ads, (ads) => ads.userAdCompares, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "ad_id", referencedColumnName: "id" }])
  ad: Ads;

  @ManyToOne(() => Users, (users) => users.userAdCompares, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
