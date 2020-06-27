import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    createUser = new CreateUserService(
      new FakeUserRepository(),
      new FakeHashProvider(),
      new FakeCacheProvider(),
    );
  });

  it('shold be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('shold not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jsondoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
