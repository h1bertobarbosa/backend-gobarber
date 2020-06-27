import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    authUser = new AuthenticateUserService(fakeRepository, fakeHashProvider);
    createUser = new CreateUserService(
      fakeRepository,
      fakeHashProvider,
      new FakeCacheProvider(),
    );
  });

  it('shold be able to create a new user', async () => {
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
    await expect(
      authUser.execute({
        email: 'jsondoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to auth with wrong password', async () => {
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
