import IParseMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateProvider';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateProvider): Promise<string>;
}
