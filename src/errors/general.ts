class ValidationError extends Error {
  code: number;

  constructor(message?: string) {
    super(message ?? 'ValidationError');
    this.code = 422;
  }
}
class MissingParameter extends Error {
  code: number;

  constructor(message?: string) {
    super(message ?? 'MissingParameter');
    this.code = 422;
  }
}
class UnknownError extends Error {
  code: number;

  constructor(message: string | undefined) {
    super(message ?? 'UnknownError');
    this.code = 500;
  }
}

// token is expired , invalid or doesn't exist
class InvalidToken extends Error {
  code: number;

  constructor() {
    super('Invalid or expired token');
    this.code = 401;
  }
}
class DbEntryAlreadyExists extends Error {
  code: number;

  constructor() {
    super('This entry already exists');
    this.code = 410;
  }
}
class DbEntryNotFound extends Error {
  code: number;

  constructor() {
    super('This entry does not exists');
    this.code = 404;
  }
}
export {
  ValidationError,
  MissingParameter,
  UnknownError,
  InvalidToken,
  DbEntryAlreadyExists,
  DbEntryNotFound,
};
