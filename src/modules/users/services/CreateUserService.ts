import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

injectable();
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPass = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPass,
    });

    return user;
  }
}
