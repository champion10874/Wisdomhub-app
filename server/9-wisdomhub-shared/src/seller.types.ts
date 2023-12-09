import { ObjectId } from "mongoose";
import { TRatingCategories } from "./review.types";

export type TSellerType =
  | string
  | string[]
  | number
  | TRatingCategories
  | Date
  | TExperience
  | TExperience[]
  | TEducation
  | TEducation[]
  | TCertificate
  | TCertificate[]
  | TLanguage
  | TLanguage[]
  | unknown
  | undefined;

export type TLanguage = {
  [key: string]: string | number | undefined;
  _id?: string;
  language: string;
  level: string;
}

export type TExperience = {
  [key: string]: string | number | boolean | undefined;
  _id?: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  currentlyWorkingHere: boolean | undefined;
}

export type TEducation = {
  [key: string]: string | number | undefined;
  _id?: string;
  country: string;
  university: string;
  title: string;
  major: string;
  year: string;
}

export type TCertificate = {
  [key: string]: string | number | undefined;
  _id?: string;
  name: string;
  from: string;
  year: number | string;
}

export type TSellerDocument = Record<string, TSellerType> & {
  _id?: string | ObjectId;
  profilePublicId?: string;
  fullName: string;
  username?: string;
  email?: string;
  profilePicture?: string;
  description: string;
  country: string;
  oneliner: string;
  skills: string[];
  ratingsCount?: number;
  ratingSum?: number;
  ratingCategories?: TRatingCategories;
  languages: TLanguage[];
  responseTime: number;
  recentDelivery?: Date | string;
  experience: TExperience[];
  education: TEducation[];
  socialLinks: string[];
  certificates: TCertificate[];
  ongoingJobs?: number;
  completedJobs?: number;
  cancelledJobs?: number;
  totalEarnings?: number;
  totalGigs?: number;
  paypal?: string;
  createdAt?: Date | string;
}
