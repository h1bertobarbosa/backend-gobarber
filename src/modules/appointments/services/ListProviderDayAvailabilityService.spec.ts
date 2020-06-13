// import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('shold be able to list the day availability from providers', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'provider-id',
      user_id: 'user-id',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'provider-id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
