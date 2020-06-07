import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('shold be able to create a new user', async () => {
    const createUser = new CreateUserService(
      new FakeUserRepository(),
      new FakeHashProvider(),
    );
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('shold not be able to create a new user with same email from another', async () => {
    const createUser = new CreateUserService(
      new FakeUserRepository(),
      new FakeHashProvider(),
    );
    await createUser.execute({
      name: 'John Doe',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jsondoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
