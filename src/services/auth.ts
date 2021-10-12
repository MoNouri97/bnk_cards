import { compare, hash } from 'bcrypt';
import User from 'entity/User';
import { WrongCredentials } from 'errors/auth';
import { DbEntryAlreadyExists, UnknownError } from 'errors/general';
import jwt from 'jsonwebtoken';

const login = async (email: string, password: string) => {
  const userWithEmail = await User.findOne({
    where: { email },
  });

  if (!userWithEmail) {
    throw new WrongCredentials();
  }

  if (!(await compare(password, userWithEmail.password))) {
    throw new WrongCredentials();
  }
  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET!,
  );

  return { message: 'Welcome Back!', token: jwtToken };
};

const register = async ({ fullName, email, password }: Partial<User>) => {
  const user = User.create({ fullName, email, password });
  const alreadyExistsUser = await User.findOne({ where: { email } });

  if (alreadyExistsUser) {
    throw new DbEntryAlreadyExists();
  }

  const saltRounds = 10;
  const hashed = await hash(password!, saltRounds);
  user.password = hashed;
  const addedUser = await User.save(user);

  if (!addedUser) {
    throw new UnknownError('error while creating user');
  }

  return {
    message: 'Thanks for registering',
    addedUser,
  };
};
export { login, register };
