import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepo: FakeUserRepository;
let updateProfileService: UpdateProfileService;
let fakeHashProvider: FakeHashProvider;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepo = new FakeUserRepository();
    updateProfileService = new UpdateProfileService(
      fakeUserRepo,
      fakeHashProvider,
    );
  });

  it('shold be able to update user profile', async () => {
    const user = await fakeUserRepo.create({
      name: 'John Doe',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Juvenal',
      email: 'juvena@gmail.com',
    });

    expect(updatedUser.name).toBe('Juvenal');
    expect(updatedUser.email).toBe('juvena@gmail.com');
  });

  it('shold not be able to change to another user email', async () => {
    await fakeUserRepo.create({
      name: 'John Doe',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    const user = await fakeUserRepo.create({
      name: 'John Doe 2',
      email: 'jsondoe2@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Juvenal',
        email: 'jsondoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold be able to update password', async () => {
    const user = await fakeUserRepo.create({
      name: 'John Doe',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Juvenal',
      email: 'juvena@gmail.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('shold not be able to update password without old pass', async () => {
    const user = await fakeUserRepo.create({
      name: 'John Doe',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Juvenal',
        email: 'juvena@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to update password if wrong old pass', async () => {
    const user = await fakeUserRepo.create({
      name: 'John Doe',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Juvenal',
        email: 'juvena@gmail.com',
        password: '123123',
        old_password: 'wrong-pass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
