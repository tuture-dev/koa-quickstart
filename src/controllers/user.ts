import { Context } from 'koa';
import { getManager } from 'typeorm';

import { User } from '../entity/user';

export default class UserController {
  public static async listUsers(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();

    ctx.status = 200;
    ctx.body = users;
  }

  public static async showUserDetail(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(+ctx.params.id);

    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      ctx.status = 404;
    }
  }

  public static async updateUser(ctx: Context) {
    const userId = +ctx.params.id;

    if (userId !== +ctx.state.user.id) {
      ctx.status = 403;
      ctx.body = { message: '无权进行此操作' };
      return;
    }

    const userRepository = getManager().getRepository(User);
    await userRepository.update(userId, ctx.request.body);
    const updatedUser = await userRepository.findOne(userId);

    if (updatedUser) {
      ctx.status = 200;
      ctx.body = updatedUser;
    } else {
      ctx.status = 404;
    }
  }

  public static async deleteUser(ctx: Context) {
    const userId = +ctx.params.id;

    if (userId !== +ctx.state.user.id) {
      ctx.status = 403;
      ctx.body = { message: '无权进行此操作' };
      return;
    }

    const userRepository = getManager().getRepository(User);
    await userRepository.delete(userId);

    ctx.status = 204;
  }
}
