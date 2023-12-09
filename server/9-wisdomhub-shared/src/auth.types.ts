declare global {
  namespace Express {
    interface Request {
      currentUser?: TAuthPayload;
    }
  }
}

export type TAuthPayload = {
  id: number;
  username: string;
  email: string;
  iat?: number;
}

export type TAuth = {
  username?: string;
  password?: string;
  email?: string;
  country?: string;
  profilePicture?: string;
}

export type TAuthDocument = {
  id?: number;
  profilePublicId?: string;
  username?: string;
  email?: string;
  password?: string;
  country?: string;
  profilePicture?: string;
  emailVerified?: number;
  emailVerificationToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

export type TAuthBuyerMessageDetails = {
  username?: string;
  profilePicture?: string;
  email?: string;
  country?: string;
  createdAt?: Date;
  type?: string;
}

export type TEmailMessageDetails = {
  receiverEmail?: string;
  template?: string;
  verifyLink?: string;
  resetLink?: string;
  username?: string;
}

export type TSignUpPayload = {
  [key: string]: string;
  username: string;
  password: string;
  email: string;
  country: string;
  profilePicture: string;
}

export type TSignInPayload = {
  [key: string]: string;
  username: string;
  password: string;
}

export type TForgotPassword = {
  email: string;
}

export type TResetPassword = {
  [key: string]: string;
  password: string;
  confirmPassword: string;
}

export type TReduxAuthPayload = {
  authInfo?: TAuthDocument;
}

export type TReduxAddAuthUser = {
  type: string;
  payload: TReduxAuthPayload;
}

export type TReduxLogout = {
  type: string;
  payload: boolean;
}

export type TAuthResponse = {
  message: string;
}

export type TAuthUser = {
  profilePublicId: string | null;
  country: string | null;
  createdAt: Date | null;
  email: string | null;
  emailVerificationToken: string | null;
  emailVerified: boolean | null;
  id: number | null;
  passwordResetExpires: Date | null;
  passwordResetToken: string |null;
  profilePicture: string | null;
  updatedAt: Date | null;
  username: string | null;
}
