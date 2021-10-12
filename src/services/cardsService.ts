import Card from 'entity/Card';
import { DbEntryNotFound } from 'errors/general';

const getAllByUserId = async (userId: string) => {
  const data = await Card.find({ user: { id: userId } });
  return { cards: data, count: data.length };
};

const createCard = async (userId: string, primaryAccountNumber: string) => {
  // TODO: call to vis/mastercard for card info
  const card = await Card.create({
    number: '1234567890123',
    primaryAccountNumber,
    user: { id: userId },
  }).save();
  return card;
};
const deleteCards = async (userId: string, ids: string[]) => {
  const cards = await Card.findByIds(ids, { where: { user: { id: userId } } });
  if (!cards.length) {
    throw new DbEntryNotFound();
  }
  return Card.remove(cards);
};

export { getAllByUserId, createCard, deleteCards };
