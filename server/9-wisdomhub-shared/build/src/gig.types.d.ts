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
import { ObjectId } from "mongoose";
import { TRatingCategories, TReviewDocument } from "./review.types";
import { TSellerDocument } from "./seller.types";
export type TGigType = string | string[] | number | unknown | undefined;
export type TCreateGig = Record<string, TGigType> & {
    sellerId?: string;
    profilePicture?: string;
    title: string;
    categories: string;
    description: string;
    subCategories: string[];
    tags: string[];
    price: number;
    coverImage: string;
    expectedDelivery: string;
    basicTitle: string;
    basicDescription: string;
};
export type TSellerGig = {
    _id?: string | ObjectId;
    id?: string | ObjectId;
    sellerId?: string | ObjectId;
    title: string;
    username?: string;
    profilePicture?: string;
    email?: string;
    description: string;
    active?: boolean;
    categories: string;
    subCategories: string[];
    tags: string[];
    ratingsCount?: number;
    ratingSum?: number;
    ratingCategories?: TRatingCategories;
    expectedDelivery: string;
    basicTitle: string;
    basicDescription: string;
    price: number;
    coverImage: string;
    createdAt?: Date | string;
    sortId?: number;
    toJSON?: () => unknown;
};
export type TGigContext = {
    gig: TSellerGig;
    seller: TSellerDocument;
    isSuccess?: boolean;
    isLoading?: boolean;
};
export type TGigsProps = {
    type?: string;
    gig?: TSellerGig;
};
export type TGigCardItems = {
    gig: TSellerGig;
    linkTarget: boolean;
    showEditIcon: boolean;
};
export type TSelectedBudget = {
    minPrice: string;
    maxPrice: string;
};
export type TGigViewReviewsProps = {
    showRatings: boolean;
    reviews?: TReviewDocument[];
};
export type TGigInfo = {
    total: number | string;
    title: string;
    bgColor: string;
};
export type TGigTopProps = {
    gigs: TSellerGig[];
    title?: string;
    subTitle?: string;
    category?: string;
    width: string;
    type: string;
};
