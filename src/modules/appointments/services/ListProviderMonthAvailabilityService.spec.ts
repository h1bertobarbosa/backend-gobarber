// import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('shold be able to list the month availability from providers', async () => {
    await Promise.all([
      fakeAppointmentRepository.create({
        provider_id: 'userid',
        date: new Date(2020, 4, 20, 8, 0, 0),
      }),
      fakeAppointmentRepository.create({
        provider_id: 'userid',
        date: new Date(2020, 4, 20, 10, 0, 0),
      }),
      fakeAppointmentRepository.create({
        provider_id: 'userid',
        date: new Date(2020, 4, 21, 8, 0, 0),
      }),
    ]);

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'userid',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ]),
    );
  });
});
