import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}
@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const otherUserMail = await this.usersRepository.findByEmail(email);

    if (otherUserMail && otherUserMail.id !== user.id) {
      throw new AppError('E-mail already in use');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the password to set the new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }
}
