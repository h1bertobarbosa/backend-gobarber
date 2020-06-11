interface ITemplateVariables {
  [key: string]: string | number;
}
export default interface IParseMailTemplateProvider {
  template: string;
  variables: ITemplateVariables;
}
