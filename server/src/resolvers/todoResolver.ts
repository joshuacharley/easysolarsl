import {
  Arg,
  Ctx,
  Mutation,
  Query,
  UseMiddleware,
  Resolver,
} from "type-graphql";
import { Todo, TodoModal } from "../entity/Todo";
import { isAuth } from "../middleware/isAuthMiddleware";
import { MyContext } from "../context/myContext";

@Resolver()
export class TodoResolver {
  @Query(() => String)
  testing2() {
    return "gi";
  }

  @Query(() => [Todo!])
  @UseMiddleware(isAuth)
  async getTodos(@Ctx() { payload }: MyContext) {
    return TodoModal.find({
      userId: payload?.userId,
      isDeleted: false,
    });
  }

  //update a todo item
  @Mutation(() => Todo)
  @UseMiddleware(isAuth)

  // @ts-ignore
  async updateTodo(
    @Arg("todoId") todoId: number,
    @Arg("description") description: string,
    @Arg("modifiedAt") modifiedAt: Date,
    @Ctx() { payload }: MyContext
  ) {
    try {
      // @ts-ignore
      const todoToUpdate = await TodoModal.findOneAndUpdate(
        {
          todoId: todoId,
          userId: payload?.userId,
        },
        {
          description,
          modifiedAt,
        },
        { new: true }
      );

      return todoToUpdate;
    } catch (err) {
      console.log(err);
    }
  }

  //delete a todo
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteItem(
    @Arg("todoId") todoId: number,
    @Ctx() { payload }: MyContext
  ) {
    try {
      const deleteTodo = TodoModal.findOneAndDelete(
        {
          todoId: todoId,
          userId: payload?.userId,
        },
        (err, docs) => {
          if (err) {
            console.log(err);
            throw err;
          } else {
            console.log(docs);
          }
        }
      );

      console.log(deleteTodo);
      return deleteTodo;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  //create a new todo item
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createTodo(
    @Ctx() { payload }: MyContext,

    @Arg("todoId") todoId: number,
    @Arg("description") description: string,
    @Arg("createAt") createdAt: Date
  ) {
    // @ts-ignore
    const todo = await TodoModal.create({
      todoId,
      description,
      createdAt,
      // @ts-ignore
      userId: payload?.userId,
    });

    todo.save();

    return true;
  }
}
