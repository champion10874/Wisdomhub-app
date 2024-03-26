import crypto from 'crypto';
import { Request, Response } from 'express';
import { BadRequestError, IAuthDocument, IEmailMessageDetails } from '@hassonor/wisdomhub-shared';
import { StatusCodes } from 'http-status-codes';
import { getAuthUserByEmail, getAuthUserById, updateVerifyEmailField } from '@auth/services/auth-service';
import { authConfig } from '@auth/config';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import { authChannel } from '@auth/server';
import { lowerCase } from 'lodash';

export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  try {
    let user = null;
    const existingUser: IAuthDocument | undefined = await getAuthUserById(req.currentUser!.id);
    if (Object.keys(existingUser!).length) {
      user = existingUser;
    }
    res.status(StatusCodes.OK).json({ message: 'Authenticated user', user });

  } catch (error) {
    // console.error('getCurrentUser Error:', error); // move to elasticsearch later
    const errorMessage =
      error instanceof BadRequestError ? error.message : 'An unexpected error occurred.';
    res
      .status(error instanceof BadRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: errorMessage });
  }
}

export async function resendEmail(req: Request, res: Response): Promise<void> {
  try {
    const { email, userId } = req.body;
    const userExist: IAuthDocument | undefined = await getAuthUserByEmail(email);
    if (!userExist) {
      throw new BadRequestError('Email is invalid', 'CurrentUser resendEmail() method error');
    }

    const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
    const randomCharacters: string = randomBytes.toString('hex');
    const verificationLink = `${authConfig.CLIENT_URL}/confirm_email?v_token=${randomCharacters}`;
    await updateVerifyEmailField(userId, 0, randomCharacters);
    const messageDetails: IEmailMessageDetails = {
      receiverEmail: lowerCase(email),
      verifyLink: verificationLink,
      template: 'verifyEmail'
    };
    await publishDirectMessage(
      authChannel,
      'wisdomhub-email-notification',
      'auth-email',
      JSON.stringify(messageDetails),
      'Verify email message has been sent to notification service.'
    );

    const updatedUser = await getAuthUserById(parseInt(userId));
    res.status(StatusCodes.OK).json({ message: 'Email verification sent', user: updatedUser });

  } catch (error) {
    // console.error('getCurrentUser Error:', error); // move to elasticsearch later
    const errorMessage =
      error instanceof BadRequestError ? error.message : 'An unexpected error occurred.';
    res
      .status(error instanceof BadRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: errorMessage });
  }
}
