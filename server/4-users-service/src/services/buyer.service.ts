import { IBuyerDocument } from '@hassonor/wisdomhub-shared';
import { BuyerModel } from '@users/models/buyer.schema';

const getBuyerByEmail = async (email: string): Promise<IBuyerDocument | null> => {
  const buyer: IBuyerDocument | null = await BuyerModel.findOne({ email }).exec() as IBuyerDocument;
  return buyer;
};

const getBuyerByUsername = async (username: string): Promise<IBuyerDocument | null> => {
  const buyer: IBuyerDocument | null = await BuyerModel.findOne({ username }).exec() as IBuyerDocument;
  return buyer;
};


const getRandomBuyers = async (count: number): Promise<IBuyerDocument[]> => {
  const arrayOfRandomBuyers: IBuyerDocument[] = await BuyerModel.aggregate([{ $sample: { size: count } }]);
  return arrayOfRandomBuyers;
};

const createBuyer = async (buyerData: IBuyerDocument): Promise<void> => {
  const checkIfBuyerExist: IBuyerDocument | null = await getBuyerByEmail(`${buyerData.email}`);
  if (!checkIfBuyerExist) {
    await BuyerModel.create(buyerData);
  }
};

export {
  getBuyerByEmail,
  getBuyerByUsername,
  getRandomBuyers,
  createBuyer
};
