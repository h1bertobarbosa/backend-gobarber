import { container } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProviders';
import DiskStorageProvider from '@shared/container/providers/StorageProviders/implementations/DiskStorageProvider';
// import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
