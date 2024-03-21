import { Request, Response } from 'express';
import { BadRequestError, IAuthDocument, isEmail } from '@hassonor/wisdomhub-shared';
import { StatusCodes } from 'http-status-codes';
import { signinSchema } from '@auth/schemes/signin.scheme';
import { getAuthUserByEmail, getAuthUserByUsername, signToken } from '@auth/services/auth-service';
import { AuthModel } from '@auth/models/auth.schema';
import { omit } from 'lodash';

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { error } = await Promise.resolve(signinSchema.validate(req.body));
    if (error?.details) {
      throw new BadRequestError(error.details[0].message, 'SignIn read() method error');
    }

    const { username, password } = req.body;
    const isValidEmail: boolean = isEmail(username);

    let existingUser: IAuthDocument | undefined = !isValidEmail
      ? await getAuthUserByUsername(username)
      : await getAuthUserByEmail(username);
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials', 'SignIn read() method error');
    }

    const isPasswordMatched: boolean = await (AuthModel.prototype as any).comparePassword(password, existingUser.password);
    if (!isPasswordMatched) {
      throw new BadRequestError('Invalid credentials', 'SignIn read() method error');
    }
    const userJWT: string = signToken(existingUser.id!, existingUser.email!, existingUser.username!);
    const userDataWithoutThePassword: IAuthDocument = omit(existingUser, ['password']);

    res.status(StatusCodes.OK).json({
      message: 'User login successfully',
      user: userDataWithoutThePassword,
      token: userJWT
    });
  } catch (error) {
    console.error('SignIn Error:', error); // move to elasticsearch later
    const errorMessage = error instanceof BadRequestError ? error.message : 'An unexpected error occurred during the sign-in process.';
    res
      .status(error instanceof BadRequestError ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: errorMessage });
  }
}
