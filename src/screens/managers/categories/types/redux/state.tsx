import { ITypesModel } from '../models';

export type ActionState = {
  toggleForm: boolean;
  data: ITypesModel;
  isNew: boolean;
  isUpdate: boolean;
};
