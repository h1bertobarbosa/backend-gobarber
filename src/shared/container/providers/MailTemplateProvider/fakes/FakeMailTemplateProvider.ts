import IParseMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateProvider';
import IMailTemplateProvidor from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvidor';

export default class FakeMailTemplateProvider implements IMailTemplateProvidor {
  public async parse({
    template,
  }: IParseMailTemplateProvider): Promise<string> {
    return template;
  }
}
