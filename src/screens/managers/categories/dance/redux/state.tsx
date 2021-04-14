import { IDanceModel } from '../models';

export type ActionState = {
  toggleForm: boolean;
  data: IDanceModel;
  isNew: boolean;
  isUpdate: boolean;
};
