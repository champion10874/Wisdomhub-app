import { ObjectId } from "mongoose";

export type TBuyerDocument = {
  _id?: string | ObjectId;
  username?: string;
  email?: string;
  profilePicture?: string;
  country: string;
  isSeller?: boolean;
  purchasedGigs: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type TReduxBuyer = {
  type?: string;
  payload: TBuyerDocument;
}
