import { Action, DataObject, FormObject, KeyValue } from '../response-config-module.model';

export interface ConfigModuleModel {
  forms: {
    [key: string]: FormObject;
  };
  actions: {
    [key: string]: Action;
  };
  formatting: {
    [key: string]: KeyValue;
  };
  dataObject: DataObject[] | any;
}
