import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'francesco10@ethereal.email',
        pass: 'RWAUvnUWzr9KMw8TT7',
      },
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });
  }
}
