type CardData = {
  primaryAccountNumber: string;
  number: string;
  expirationDate: Date;
};

const createMasterCardData = (primaryAccountNumber: string): CardData => ({
  primaryAccountNumber,
  number: `6759-1685-5194-1401${Math.random() * 10 - 1}`,
  expirationDate: new Date('Thu Nov 11 2022 04:34:08 GMT+0100 (Central European Standard Time)'),
});
const createVisaData = (primaryAccountNumber: string): CardData => ({
  primaryAccountNumber,
  number: `5597-7161-2836-988${Math.random() * 10 - 1}`,
  expirationDate: new Date('Thu Nov 11 2022 04:34:08 GMT+0100 (Central European Standard Time)'),
});

export { createMasterCardData, createVisaData };
