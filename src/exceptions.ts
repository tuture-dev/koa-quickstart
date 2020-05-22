export class BaseException extends Error {
  // 状态码
  status: number;
  // 提示信息
  message: string;
}

export class NotFoundException extends BaseException {
  status = 404;

  constructor(msg?: string) {
    super();
    this.message = msg || '无此内容';
  }
}

export class UnauthorizedException extends BaseException {
  status = 401;

  constructor(msg?: string) {
    super();
    this.message = msg || '尚未登录';
  }
}

export class ForbiddenException extends BaseException {
  status = 403;

  constructor(msg?: string) {
    super();
    this.message = msg || '权限不足';
  }
}
