// import AppError from '@shared/errors/AppError';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepo: FakeUserRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepo = new FakeUserRepository();
    listProvidersService = new ListProvidersService(fakeUserRepo);
  });

  it('shold be able to list providers', async () => {
    const [user1, user2, userLogged] = await Promise.all([
      fakeUserRepo.create({
        name: 'John Doe',
        email: 'jsondoe@gmail.com',
        password: '123456',
      }),
      fakeUserRepo.create({
        name: 'John Tree',
        email: 'jsondoe3@gmail.com',
        password: '123456',
      }),
      fakeUserRepo.create({
        name: 'John Quatro',
        email: 'jsondoe4@gmail.com',
        password: '123456',
      }),
    ]);

    const providers = await listProvidersService.execute({
      user_id: userLogged.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
