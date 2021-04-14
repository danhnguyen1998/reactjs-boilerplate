import { IDanceTypeModel } from '../models';

export type ActionState = {
  toggleForm: boolean;
  data: IDanceTypeModel;
  isNew: boolean;
  isUpdate: boolean;
};
