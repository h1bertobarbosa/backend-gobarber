import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('shold be able to create a new appointment', async () => {
    const createAppointment = new CreateAppointmentService(
      new FakeAppointmentRepository(),
    );
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
  });

  // it('shold not be able to create two appointments on the same time', () => {
  //   expect(1 + 2).toBe(3);
  // });
});
