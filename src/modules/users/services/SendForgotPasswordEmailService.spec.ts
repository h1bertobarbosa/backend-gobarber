// import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPAsswordEmail', () => {
  it('shold be able to recover the password using the email', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUserRepo,
      fakeMailProvider,
    );

    await fakeUserRepo.create({
      name: 'John Doe',
      email: 'jsondoe@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'jsondoe@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
