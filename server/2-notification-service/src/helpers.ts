import { Logger } from 'winston';
import { IEmailLocals, winstonLogger } from '@hassonor/wisdomhub-shared';
import { notificationConfig } from '@notifications/config';
import nodemailer, { Transporter } from 'nodemailer';
import Email from 'email-templates';
import path from 'path';


const log: Logger = winstonLogger(`${notificationConfig.ELASTIC_SEARCH_URL}`, 'mailTransportHelper', 'debug');


async function emailTemplates(template: string, receiver: string, locals: IEmailLocals): Promise<void> {
  try {
    const smtpTransport: Transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: notificationConfig.SENDER_EMAIL,
        pass: notificationConfig.SENDER_EMAIL_PASSWORD
      }
    });

    const email: Email = new Email({
      message: {
        from: `Wesdomhub App <${notificationConfig.SENDER_EMAIL}>`
      },
      send: true,
      preview: false,
      transport: smtpTransport,
      views: {
        options: {
          extension: 'ejs'
        }
      },
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          relativeTo: path.join(__dirname, '../build')
        }
      }
    });

    await email.send({
      template: path.join(__dirname, '..', 'src/emails', template),
      message: { to: receiver },
      locals
    });

  } catch (error) {
    log.error(error);
  }
}

export { emailTemplates };
