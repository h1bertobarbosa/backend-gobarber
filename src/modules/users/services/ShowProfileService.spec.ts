import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepo: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepo = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUserRepo);
  });

  it('shold be able to show user profile', async () => {
    const user = await fakeUserRepo.create({
      name: 'John Doe',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('jsondoe@gmail.com');
  });

  it('shold not be able to show user profile from non existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
