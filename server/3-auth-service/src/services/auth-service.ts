import {
  firstLetterUppercase,
  IAuthBuyerMessageDetails,
  IAuthDocument,
  winstonLogger
} from '@hassonor/wisdomhub-shared';
import { AuthModel } from '@auth/models/auth.schema';
import { Model, Op } from 'sequelize';
import { publishDirectMessage } from '@auth/queues/auth.producer';
import { authChannel } from '@auth/server';
import { lowerCase, omit } from 'lodash';
import { Logger } from 'winston';
import { authConfig } from '@auth/config';


const log: Logger = winstonLogger(`${authConfig.ELASTIC_SEARCH_URL}`, 'authService', 'debug');

export async function createAuthUser(data: IAuthDocument): Promise<IAuthDocument | undefined> {
  try {
    const result: Model = await AuthModel.create(data);
    const messageDetails: IAuthBuyerMessageDetails = {
      username: result.dataValues.username!,
      email: result.dataValues.email!,
      profilePicture: result.dataValues.profilePicture!,
      country: result.dataValues.country!,
      createdAt: result.dataValues.createdAt!,
      type: 'auth'
    };

    await publishDirectMessage(
      authChannel,
      'wisdomhub-buyer-update',
      'user-buyer',
      JSON.stringify(messageDetails),
      'Buyer details sent to buyer service.'
    );

    // Omit the password from return data
    const userData: IAuthDocument = omit(result.dataValues, ['password']) as IAuthDocument;
    return userData;
  } catch (error) {
    log.error(error);
  }
}

export async function getAuthUserById(authId: number): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = await AuthModel.findOne({
      where: { id: authId },
      attributes: {
        exclude: ['password']
      }
    }) as Model;
    return user.dataValues;
  } catch (error) {
    log.error(error);
  }
}

export async function getAuthUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = await AuthModel.findOne({
      where: {
        [Op.or]: [{ username: firstLetterUppercase(username) }, { email: lowerCase(email) }]
      }
    }) as Model;
    return user.dataValues;
  } catch (error) {
    log.error(error);
  }
}

export async function getAuthUserByUsername(username: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = await AuthModel.findOne({
      where: { username: firstLetterUppercase(username) }
    }) as Model;
    return user.dataValues;
  } catch (error) {
    log.error(error);
  }
}

export async function getAuthUserByEmail(email: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = await AuthModel.findOne({
      where: { email: lowerCase(email) }
    }) as Model;
    return user.dataValues;
  } catch (error) {
    log.error(error);
  }
}

export async function getAuthUserByVerificationToken(token: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = await AuthModel.findOne({
      where: { emailVerificationToken: token },
      attributes: {
        exclude: ['password']
      }
    }) as Model;
    return user.dataValues;
  } catch (error) {
    log.error(error);
  }
}

export async function getAuthUserByPasswordToken(token: string): Promise<IAuthDocument | undefined> {
  try {
    const user: Model = await AuthModel.findOne({
      where: {
        [Op.and]: [{ passwordResetToken: token }, { passwordResetExpires: { [Op.gt]: new Date() } }]
      }
    }) as Model;
    return user?.dataValues;
  } catch (error) {
    log.error(error);
  }
}
