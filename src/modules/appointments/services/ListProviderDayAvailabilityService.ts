import { injectable, inject } from 'tsyringe';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getHours, isAfter } from 'date-fns';
// import AppError from '@shared/errors/AppError';

type IRequest = {
  provider_id: string;
  month: number;
  year: number;
  day: number;
};

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

const HOUR_START = 8;

@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      },
    );

    const eachHourArray = Array.from(
      { length: 10 },
      (_, idx) => idx + HOUR_START,
    );

    const currentDate = new Date();

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        item => getHours(item.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}
