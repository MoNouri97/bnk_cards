/* eslint-disable no-unused-vars */

declare namespace Express {
  export interface Request {
    user: { id: string; email: string };
  }
}
