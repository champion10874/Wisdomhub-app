/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
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
};
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
};
export type TChatBoxProps = {
    seller: TChatSellerProps;
    buyer: TChatBuyerProps;
    gigId: string;
    onClose: () => void;
};
export type TChatSellerProps = {
    _id: string;
    username: string;
    profilePicture: string;
    responseTime: number;
};
export type TChatBuyerProps = {
    _id: string;
    username: string;
    profilePicture: string;
};
export type TChatMessageProps = {
    message: TMessageDocument;
    seller?: TSellerDocument;
    gig?: TSellerGig;
};
