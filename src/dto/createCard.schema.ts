import { object, string } from 'yup';

export default object({
  body: object({
    pan: string().min(13).required(),
  }),
});
