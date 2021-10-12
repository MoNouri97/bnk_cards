import User from 'entity/User';
import { PassportStatic } from 'passport';
import { ExtractJwt, Strategy as StrategyJwt } from 'passport-jwt';

const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new StrategyJwt(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload, done) => {
        try {
          const user = await User.findOneOrFail({
            where: { id: jwtPayload.id },
          });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
};

export default passportConfig;
