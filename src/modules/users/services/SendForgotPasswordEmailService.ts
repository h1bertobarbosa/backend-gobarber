import User from '@modules/users/infra/typeorm/entities/User';
// import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  email: string;
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}
