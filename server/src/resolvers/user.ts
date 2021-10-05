import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { MyContext } from "../types";
import { Review } from "../entities/Review";
import { isAuth } from "../middleware/isAuth";
import { sendEmail } from "../utils/sendEmail";

@InputType()
class RegisterInput {
  @Field()
  name: string;
  @Field()
  lastname: string;
  @Field()
  email: string;
  @Field()
  number: string;
  @Field()
  role: string;
  @Field()
  password: string;
}

@InputType()
class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
class UserResponse {
  @Field(() => User)
  user!: User;

  @Field(() => [Review], { nullable: true })
  reviews?: Review[];
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    let user = await User.findOne(req.session.userId);

    if (!user) {
      return null;
    }

    return user;
  }

  @Mutation(() => User)
  async register(
    @Arg("options") options: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    try {
      if (!options.email.includes("@") || options.email.length < 5) {
        throw new Error("Некорректная почта");
      }

      if (options.password.length < 6) {
        throw new Error("Пароль должен быть больше 6 символов");
      }

      if (options.password.length > 16) {
        throw new Error("Пароль должен быть меньше 16 символов");
      }
      const hash = await argon2.hash(options.password);

      const user = await User.create({
        name: options.name,
        lastname: options.lastname,
        email: options.email,
        number: options.number,
        role: options.role,
        hash,
      }).save();
      req.session.userId = user?.id;

      return user;
    } catch (error) {
      if (error.code === "23505") {
        throw new Error("Такой пользователь уже существует");
      }
      throw error;
    }
  }

  @Mutation(() => User)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    try {
      const user = await User.findOne({ where: { email: options.email } });
      if (!user) {
        throw new Error("Такой пользователь не найден");
      }
      const valid = await argon2.verify(user.hash, options.password);
      if (!valid) {
        throw new Error("Такой пользователь не найден");
      }

      req.session.userId = user.id;

      return user;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((error) => {
        res.clearCookie("kit");
        if (error) {
          console.log(error);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Query(() => UserResponse)
  async getUser(@Arg("id", () => Int) id: number): Promise<UserResponse> {
    try {
      let user = await User.findOne(id);

      if (!user) throw new Error("Пользователь не найден");

      if (user.role === "farmer") {
        const reviews = await Review.find({
          where: { farmerId: id },
          relations: ["owner"],
        });
        return {
          user,
          reviews,
        };
      }

      return { user };
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async editUser(
    @Arg("name", () => String) name: string,
    @Arg("lastname", () => String) lastname: string,
    @Arg("number", () => String) number: string,
    // @Arg('image', () => GraphQLUpload, { nullable: true })
    // { createReadStream, filename }: Upload,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    try {
      const user = await User.findOne(req.session.userId);
      if (!user) throw new Error("Пользователь не найден");
      await User.update(req.session.userId!, { name, lastname, number });
      const updatedUser = await User.findOne(req.session.userId);
      if (!updatedUser) throw new Error("Пользователь не найден");
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async sendConfirmEmailCode(@Ctx() { req }: MyContext): Promise<Boolean> {
    try {
      const user = await User.findOne(req.session.userId);
      const confirmEmailCode = Math.floor(Math.random() * (9999 - 1000) + 1000);
      await User.update(req.session.userId!, { confirmEmailCode });
      await sendEmail(
        user!.email,
        `<a href="localhost:3000/confirm_email?userId=${user!.id.toString()}&code=${user!.confirmEmailCode.toString()}">Подтвердите поту нажав на эту ссылку!</a>`
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  @Mutation(() => Boolean)
  async confirmEmail(
    @Arg("id", () => Int) id: number,
    @Arg("code", () => Int) code: number
  ): Promise<Boolean> {
    try {
      const user = await User.findOne(id);
      if (user!.confirmEmailCode === code) {
        await User.update(id, { isEmailConfirmed: true });
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
