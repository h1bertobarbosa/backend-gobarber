import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('shold be able to create a new user', async () => {
    const fakeRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authUser = new AuthenticateUserService(
      fakeRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(fakeRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Josh',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    const response = await authUser.execute({
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('shold not be able to auth with non existing user', async () => {
    const fakeRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authUser = new AuthenticateUserService(
      fakeRepository,
      fakeHashProvider,
    );

    await expect(
      authUser.execute({
        email: 'jsondoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to auth with wrong password', async () => {
    const fakeRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authUser = new AuthenticateUserService(
      fakeRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(fakeRepository, fakeHashProvider);

    await createUser.execute({
      name: 'Josh',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    await expect(
      authUser.execute({
        email: 'jsondoe@gmail.com',
        password: 'badpass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
