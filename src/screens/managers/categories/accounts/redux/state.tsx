import { IAccountModel } from '../models';

export type ActionState = {
  toggleForm: boolean;
  data: IAccountModel;
  isNew: boolean;
  isUpdate: boolean;
};
