import { IBuyerDocument, ISellerDocument } from '@hassonor/wisdomhub-shared';
import { SellerModel } from '@users/models/seller.schema';
import mongoose from 'mongoose';
import { updateBuyerIsSellerProp } from '@users/services/buyer.service';


const getSellerById = async (sellerId: string): Promise<ISellerDocument | null> => {
  const seller: ISellerDocument | null = await SellerModel.findOne({ _id: new mongoose.Types.ObjectId(sellerId) }).exec();
  return seller;
};

const getSellerByUsername = async (username: string): Promise<ISellerDocument | null> => {
  const seller: ISellerDocument | null = await SellerModel.findOne({ username }).exec();
  return seller;
};

const getSellerByEmail = async (email: string): Promise<ISellerDocument | null> => {
  const seller: ISellerDocument | null = await SellerModel.findOne({ email }).exec();
  return seller;
};

const getRandomSellers = async (size: number): Promise<IBuyerDocument[]> => {
  const arrayOfRandomSellers: IBuyerDocument[] = await SellerModel.aggregate([{ $sample: { size } }]);
  return arrayOfRandomSellers;
};

const createSeller = async (sellerData: ISellerDocument): Promise<ISellerDocument | null> => {
  const checkIfSellerExist: ISellerDocument | null = await getSellerByEmail(`${sellerData.email}`);
  if (!checkIfSellerExist) {
    const createdSeller: ISellerDocument = await SellerModel.create(sellerData) as ISellerDocument;
    await updateBuyerIsSellerProp(`${createdSeller.email}`);
    return createdSeller;
  }
  return null;
};

export {
  getSellerById,
  getSellerByUsername,
  getSellerByEmail,
  getRandomSellers,
  createSeller
};
