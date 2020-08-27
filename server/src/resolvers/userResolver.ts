import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { compare, hash } from "bcryptjs";
import { User, UserModel } from "../entity/User";
import { MyContext } from "../context/myContext";
import { createAccessToken, createRefreshToken } from "../auth/auth";
import { send_refresh_token } from "../sentRefreshTokens/sendRefreshToken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  test() {
    return "hi";
  }
  @Mutation(() => Boolean)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedpassword = await hash(password, 12);
    try {
      // @ts-ignore
      const user = await UserModel.create({
        email: email,
        password: hashedpassword,
      });

      return (await user.save()) && true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }
    console.log(createAccessToken(user));

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("incorrect password");
    }

    //successfully signed in
    send_refresh_token(res, createRefreshToken(user));

    user.updateOne({
      tokenVersion: createAccessToken(user),
    });

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }
}
