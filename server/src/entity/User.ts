import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";

@ObjectType()
export class User {
  id: ObjectId;

  @Field()
  @Property()
  email: string;

  @Property()
  password: string;

  @Property({ default: 0 })
  tokenVersion: number;

  @Property()
  _createdAt: Date;

  @Property()
  _updatedAt: Date;
}

export const UserModel = getModelForClass(User);
