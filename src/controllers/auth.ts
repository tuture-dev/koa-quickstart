import { Context } from 'koa';

export default class AuthController {
  public static async login(ctx: Context) {
    ctx.body = 'Login controller';
  }

  public static async register(ctx: Context) {
    ctx.body = 'Register controller';
  }
}
