import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeCacheProvider: FakeCacheProvider;
describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
      fakeCacheProvider,
    );
  });

  it('shold be able to list the appointments on a specific day', async () => {
    const [appointment1, appointment2] = await Promise.all([
      fakeAppointmentRepository.create({
        provider_id: 'provider-id',
        user_id: 'userid',
        date: new Date(2020, 4, 20, 14, 0, 0),
      }),
      fakeAppointmentRepository.create({
        provider_id: 'provider-id',
        user_id: 'userid',
        date: new Date(2020, 4, 20, 15, 0, 0),
      }),
    ]);

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider-id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
