import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ads } from "./Ads";
import { Feedbacks } from "./Feedbacks";
import { UserAdCompare } from "./UserAdCompare";
import { UserFavourite } from "./UserFavourite";

@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "login", length: 200 })
  login: string;

  @Column("character varying", { name: "email", length: 200 })
  email: string;

  @Column("character varying", { name: "name", length: 200 })
  name: string;

  @Column("character varying", { name: "password", nullable: true })
  password: string | null;

  @Column("character varying", {
    name: "phone_number",
    nullable: true,
    length: 200,
    default: () => "'+7(909)99-99-99'",
  })
  phoneNumber: string | null;

  @OneToMany(() => Ads, (ads) => ads.user)
  ads: Ads[];

  @OneToMany(() => Feedbacks, (feedbacks) => feedbacks.user)
  feedbacks: Feedbacks[];

  @OneToMany(() => UserAdCompare, (userAdCompare) => userAdCompare.user)
  userAdCompares: UserAdCompare[];

  @OneToMany(() => UserFavourite, (userFavourite) => userFavourite.user)
  userFavourites: UserFavourite[];
}
