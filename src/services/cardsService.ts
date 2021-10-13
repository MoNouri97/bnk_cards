import Card from 'entity/Card';
import { DbEntryNotFound } from 'errors/general';
import { createMasterCardData, createVisaData } from 'services/mockService';

const getAllByUserId = async (userId: string) => {
  const data = await Card.find({ user: { id: userId } });
  return { cards: data, count: data.length };
};

const createCard = async (userId: string, primaryAccountNumber: string, type: 'mastercard' | 'visa') => {
  const data =
    type === 'mastercard' ? createMasterCardData(primaryAccountNumber) : createVisaData(primaryAccountNumber);

  const card = await Card.create({
    ...data,
    type,
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
