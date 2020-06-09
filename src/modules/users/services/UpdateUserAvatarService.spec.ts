import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('CreateUser', () => {
  it('shold be able to update user avatar', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepo,
      new FakeStorageProvider(),
    );
    const user = await fakeUserRepo.create({
      name: 'John Doe',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('shold not be able to update avatar from non existing user', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepo,
      new FakeStorageProvider(),
    );

    await expect(
      updateUserAvatar.execute({
        user_id: 'non',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold delete old avatar when updating new one', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const fakeStorage = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorage, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepo,
      fakeStorage,
    );

    const user = await fakeUserRepo.create({
      name: 'John Doe',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
