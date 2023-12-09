export type TReviewMessageDetails = {
  gigId?: string;
  reviewerId?: string;
  sellerId?: string;
  review?: string;
  rating?: number;
  orderId?: string;
  createdAt?: string;
  type: string;
}

export type TRatingTypes = {
  [key: string]: string;
}

export type TReviewDocument = {
  _id?: string;
  gigId: string;
  reviewerId: string;
  sellerId: string;
  review: string;
  reviewerImage: string;
  rating: number;
  orderId: string;
  createdAt: Date | string;
  reviewerUsername: string;
  country: string;
  reviewType?: string;
}

export type TRatingCategoryItem = {
  value: number;
  count: number;
}

export type TRatingCategories = {
  five: TRatingCategoryItem;
  four: TRatingCategoryItem;
  three: TRatingCategoryItem;
  two: TRatingCategoryItem;
  one: TRatingCategoryItem;
}
