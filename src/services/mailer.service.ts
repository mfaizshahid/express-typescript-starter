import { env, logger } from '@src/config';
import type { IApp } from '@src/interfaces';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: env.mail.host,
  port: env.mail.port,
  secure: env.mail.port === 465,
  auth: {
    user: env.mail.user,
    pass: env.mail.password,
  },
});

/**
 * Method to send an email using the configured transporter.
 *
 * @param options - EmailOptions containing recipient, subject, and content.
 * @returns A promise that resolves when the email is sent.
 */
const sendEmail = async ({
  to,
  subject,
  text,
  html,
  from = env.mail.defaultEmail,
}: IApp.EmailOptions) => {
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
  logger.info('Email sent:', { to, subject });
};

export default { sendEmail };
