import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ObjectId } from "mongodb";
import { User } from "./User";

@ObjectType()
export class Todo {
  id: ObjectId;

  @Field()
  @Property()
  todoId: number;

  @Field()
  @Property()
  description: string;

  @Field()
  @Property()
  createdAt: Date;

  @Field({ nullable: true })
  @Property({ required: false })
  modifiedAt: Date;

  @Field({ nullable: true })
  @Property({ required: false })
  deletedAt: Date;

  @Field({ defaultValue: false, nullable: true })
  @Property({ default: false, required: false })
  isDeleted: Boolean;

  @Field(() => User)
  @Property({ ref: User, required: true })
  userId: Ref<User>;
}

export const TodoModal = getModelForClass(Todo);
