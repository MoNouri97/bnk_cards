class WrongCredentials extends Error {
  code: number;

  constructor() {
    super('Wrong user name or password');
    this.code = 403;
  }
}

class UnauthorizedAccess extends Error {
  code: number;

  constructor() {
    super('Operation not authorized');
    this.code = 401;
  }
}

export { UnauthorizedAccess, WrongCredentials };
