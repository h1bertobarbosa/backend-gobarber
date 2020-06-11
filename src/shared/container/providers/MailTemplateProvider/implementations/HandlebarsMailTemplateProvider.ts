import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateProvider';
import IMailTemplateProvidor from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvidor {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateProvider): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
