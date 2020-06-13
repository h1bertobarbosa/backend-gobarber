import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    createAppointment = new CreateAppointmentService(
      new FakeAppointmentRepository(),
    );
  });

  it('shold be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456',
      user_id: 'user',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('shold not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);
    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456',
      user_id: 'user',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
