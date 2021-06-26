import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Models } from "./Models";
import { Users } from "./Users";

@Index("feedbacks_pkey", ["id"], { unique: true })
@Entity("feedbacks", { schema: "public" })
export class Feedbacks {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "text", length: 2000 })
  text: string;

  @ManyToOne(() => Models, (models) => models.feedbacks)
  @JoinColumn([{ name: "model_id", referencedColumnName: "id" }])
  model: Models;

  @ManyToOne(() => Users, (users) => users.feedbacks)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
