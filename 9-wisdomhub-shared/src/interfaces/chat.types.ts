import mongoose, { ObjectId } from 'mongoose';
import { TOffer } from './order.types';
import { TSellerGig } from './gig.types';
import { TSellerDocument } from './seller.types';

export interface IConversationDocument extends Document {
  _id: mongoose.Types.ObjectId | string;
  conversationId: string;
  senderUsername: string;
  receiverUsername: string;
}

export type TMessageDocument = {
  _id?: string | ObjectId;
  conversationId?: string;
  body?: string;
  url?: string;
  file?: string;
  fileType?: string;
  fileSize?: string;
  fileName?: string;
  gigId?: string;
  sellerId?: string;
  buyerId?: string;
  senderUsername?: string;
  senderPicture?: string;
  receiverUsername?: string;
  receiverPicture?: string;
  isRead?: boolean;
  hasOffer?: boolean;
  offer?: TOffer;
  hasConversationId?: boolean;
  createdAt?: Date | string;
}

export type TMessageDetails = {
  sender?: string;
  offerLink?: string;
  amount?: string;
  buyerUsername?: string;
  sellerUsername?: string;
  title?: string;
  description?: string;
  deliveryDays?: string;
  template?: string;
}

export type TChatBoxProps = {
  seller: TChatSellerProps;
  buyer: TChatBuyerProps
  gigId: string;
  onClose: () => void;
}

export type TChatSellerProps = {
  _id: string;
  username: string;
  profilePicture: string;
  responseTime: number;
}

export type TChatBuyerProps = {
  _id: string;
  username: string;
  profilePicture: string;
}

export type TChatMessageProps = {
  message: TMessageDocument;
  seller?: TSellerDocument;
  gig?: TSellerGig;
}
