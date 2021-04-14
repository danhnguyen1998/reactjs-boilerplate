import { ILevelModel } from '../models';

export type ActionState = {
  toggleForm: boolean;
  data: ILevelModel;
  isNew: boolean;
  isUpdate: boolean;
};
