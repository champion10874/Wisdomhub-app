import { Logger } from 'winston';
import { IEmailLocals, winstonLogger } from '@hassonor/wisdomhub-shared';
import { notificationConfig } from '@notifications/config';
import { emailTemplates } from '@notifications/helpers';

const log: Logger = winstonLogger(`${notificationConfig.ELASTIC_SEARCH_URL}`, 'mailTransport', 'debug');

async function sendEmail(template: string, receiverEmail: string, locals: IEmailLocals): Promise<void> {
  try {
    emailTemplates(template, receiverEmail, locals);
    log.info('Email sent successfully.');
  } catch (error) {
    log.log('error', 'NotificationService MailTransport sendEmail() method error:', error);
  }
}

export { sendEmail };
