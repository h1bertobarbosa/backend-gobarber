import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fake/FakeNotificationsRepository';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let createAppointment: CreateAppointmentService;
let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let appointmentDate: Date;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
    );
    appointmentDate = new Date();
  });

  it('shold be able to create a new appointment', async () => {
    appointmentDate.setHours(11);
    appointmentDate.setDate(appointmentDate.getDate() + 1);

    const appointment = await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456',
      user_id: 'user',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('shold not be able to create two appointments on the same time', async () => {
    appointmentDate.setHours(11);
    appointmentDate.setDate(appointmentDate.getDate() + 1);

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

  it('shold not be able to create appointment on the past date', async () => {
    appointmentDate.setHours(appointmentDate.getHours() - 1);

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to create appointment whit same user as provider', async () => {
    appointmentDate.setHours(11);
    appointmentDate.setDate(appointmentDate.getDate() + 1);

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
        user_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to create appointment before 8am and after 5pm', async () => {
    appointmentDate.setHours(7);
    appointmentDate.setDate(appointmentDate.getDate() + 1);
    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
        user_id: 'user',
      }),
    );

    appointmentDate.setHours(18);
    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
        user_id: 'user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
