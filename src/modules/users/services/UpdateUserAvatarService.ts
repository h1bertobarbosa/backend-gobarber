import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProviders';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}
@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = filename;
    await this.usersRepository.save(user);

    return user;
  }
}
