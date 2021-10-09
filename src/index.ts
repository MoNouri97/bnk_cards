import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';

const main = async () => {
  const connection = await createConnection();
  connection.runMigrations();

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
};
main().catch(err => console.log(err));
