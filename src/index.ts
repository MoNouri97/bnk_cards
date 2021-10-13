/* eslint-disable no-await-in-loop */
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './app';

const main = async () => {
  let retries = 5;
  console.log(`connecting db`);
  while (retries) {
    try {
      const connection = await createConnection();
      console.log(`connected to db`);
      connection.runMigrations();
      break;
    } catch (error) {
      retries -= 1;
      console.error(error);
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise(res => setTimeout(res, 3000));
    }
  }
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
};
main().catch(err => console.log(err));
