import { array, object, string } from 'yup';

export default object({
  body: object({
    cards: array(string().min(13)).min(1).required(),
  }),
});
