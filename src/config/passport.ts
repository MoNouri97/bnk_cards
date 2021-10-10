import User from 'entity/User';
import passport from 'passport';
import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt';
import { getRepository } from 'typeorm';

const passportConfig = () => {
  passport.use(
    new StrategyJwt(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload, done) => {
        const UserRepo = getRepository(User);
        try {
          const user = await UserRepo.findOne({ where: { id: jwtPayload.id } });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
};

export default passportConfig;
