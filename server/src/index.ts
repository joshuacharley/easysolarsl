import "dotenv/config";
import "reflect-metadata";
import { mongoose } from "@typegoose/typegoose";
import cookieParser from "cookie-parser";
import express from "express";
import { verify } from "jsonwebtoken";
import { UserModel } from "./entity/User";
import { createAccessToken, createRefreshToken } from "./auth/auth";
import { send_refresh_token } from "./sentRefreshTokens/sendRefreshToken";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/userResolver";
import { TodoResolver } from "./resolvers/todoResolver";

(async () => {
  const port = 4000;
  const app = express();
  app.use(cookieParser());
  app.get("/", (_req, res) => res.send("hello"));

  // @ts-ignore
  app.post("/refreshToken", async (req, res) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
    // res.setHeader(
    //   "Access-Control-Allow-Headers",
    //   "Content-Type, Authorization"
    // );
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    const token = req.cookies.tid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;

    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);

      const user = await UserModel.findOne({ id: payload.userId });

      if (!user) {
        return res.send({ ok: false, accessToken: "" });
      }

      if (user.tokenVersion !== payload.tokenVersion) {
        return res.send({
          ok: false,
          accessToken: "",
        });
      }

      //tampering refresh token and creates new refresh token
      send_refresh_token(res, createRefreshToken(user));

      return res.send({ ok: true, accessToken: createAccessToken(user) });
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }
  });

  //database related
  try {
    await mongoose.connect("mongodb://localhost: 27017", {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
      dbName: "test",
    });
  } catch (err) {
    console.log(err);
    throw err;
  }

  //graphql settings
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, TodoResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`express server running on localhost:${port}`);
  });
})();
